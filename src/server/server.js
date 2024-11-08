const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Percorso del file di storage
const STORAGE_FILE = path.join(__dirname, 'data', 'organization-structure.json');

// Struttura di default
const defaultStructure = {
  lastModified: {
    user: 'Sistema',
    timestamp: new Date().toISOString()
  },
  spaces: [
    {
      id: 'admin',
      icon: 'admin',
      name: 'Amministrazione e HR',
      color: 'bg-blue-100',
      communities: [
        { id: '1', name: 'Comunicazioni HR' },
        { id: '2', name: 'Richieste viaggi e trasferte' },
        { id: '3', name: 'Richieste ferie/permessi' },
        { id: '4', name: 'Documentazione amministrativa' },
        { id: '5', name: 'Welfare aziendale' }
      ]
    },
    {
      id: 'commercial',
      icon: 'commercial',
      name: 'Commerciale',
      color: 'bg-green-100',
      communities: [
        { id: '6', name: 'Comunicazioni commerciali' },
        { id: '7', name: 'Offerte progetto' },
        { id: '8', name: 'Demo e POC' },
        { id: '9', name: 'Segnalazioni clienti' },
        { id: '10', name: 'Opportunità commerciali' }
      ]
    },
    {
      id: 'technical',
      icon: 'technical',
      name: 'Tecnico',
      color: 'bg-yellow-100',
      communities: [
        { id: '11', name: 'R&D' },
        { id: '12', name: 'Delivery' },
        { id: '13', name: 'Assistenza e supporto' },
        { id: '14', name: 'Cloud & DevSecOps' },
        { id: '15', name: 'Documentazione tecnica' }
      ]
    },
    {
      id: 'operations',
      icon: 'operations',
      name: 'Operations',
      color: 'bg-purple-100',
      communities: [
        { id: '16', name: 'Ticket IT interni' },
        { id: '17', name: 'Facility management' },
        { id: '18', name: 'Richieste acquisti' },
        { id: '19', name: 'Asset aziendali' }
      ]
    },
    {
      id: 'corporate',
      icon: 'corporate',
      name: 'Aziendale',
      color: 'bg-red-100',
      communities: [
        { id: '20', name: 'Comunicazioni corporate' },
        { id: '21', name: 'Eventi aziendali' },
        { id: '22', name: 'Mercatomania (social)' },
        { id: '23', name: 'Formazione' },
        { id: '24', name: 'Certificazioni e compliance' }
      ]
    }
  ]
};

// Assicurati che la directory data esista
async function ensureDataDirectory() {
  const dataDir = path.join(__dirname, 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir, { recursive: true });
  }
}

// Carica la struttura
app.get('/api/organization/structure', async (req, res) => {
  try {
    await ensureDataDirectory();
    
    try {
      const data = await fs.readFile(STORAGE_FILE, 'utf8');
      res.json(JSON.parse(data));
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Se il file non esiste, crea e restituisci la struttura di default
        await fs.writeFile(STORAGE_FILE, JSON.stringify(defaultStructure, null, 2));
        res.json(defaultStructure);
      } else {
        throw error;
      }
    }
  } catch (error) {
    console.error('Errore nel caricamento della struttura:', error);
    res.status(500).json({ error: 'Errore nel caricamento della struttura' });
  }
});

// Salva la struttura
app.post('/api/organization/structure', async (req, res) => {
  try {
    await ensureDataDirectory();
    
    const data = req.body;
    data.lastModified = {
      user: data.lastModified?.user || 'Sistema',
      timestamp: new Date().toISOString()
    };
    
    await fs.writeFile(STORAGE_FILE, JSON.stringify(data, null, 2));
    res.json({ success: true, lastModified: data.lastModified });
  } catch (error) {
    console.error('Errore nel salvataggio della struttura:', error);
    res.status(500).json({ error: 'Errore nel salvataggio della struttura' });
  }
});

// Serve i file statici dalla cartella dist
app.use(express.static(path.join(__dirname, '../../dist')));

// Gestisce tutte le altre richieste reindirizzandole all'app React
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist/index.html'));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});
