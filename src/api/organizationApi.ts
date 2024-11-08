interface StorageData {
  lastModified: {
    user: string;
    timestamp: string;
  };
  spaces: any[];
}

export const saveOrganizationStructure = async (data: StorageData): Promise<Response> => {
  return fetch('/api/organization/structure', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  });
};

export const loadOrganizationStructure = async (): Promise<StorageData> => {
  const response = await fetch('/api/organization/structure');
  if (!response.ok) {
    throw new Error('Failed to load organization structure');
  }
  return response.json();
};
