// API configuration for different environments
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? process.env.REACT_APP_API_URL || '/api'  // Use relative URLs in production
  : 'http://localhost:3001/api';  // Use localhost in development

export const fetchAnnouncements = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/announcements`);
    if (!response.ok) {
      throw new Error('Failed to fetch announcements');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching announcements:', error);
    throw error;
  }
};

export const createAnnouncement = async (announcement) => {
  try {
    const response = await fetch(`${API_BASE_URL}/announcements`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(announcement)
    });
    
    if (!response.ok) {
      throw new Error('Failed to create announcement');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating announcement:', error);
    throw error;
  }
};

export const updateAnnouncement = async (id, announcement) => {
  try {
    const response = await fetch(`${API_BASE_URL}/announcements`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...announcement })
    });
    
    if (!response.ok) {
      throw new Error('Failed to update announcement');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating announcement:', error);
    throw error;
  }
};

export const deleteAnnouncement = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/announcements?id=${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error('Failed to delete announcement');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error deleting announcement:', error);
    throw error;
  }
};
