// src/containers/creategathertown.tsx
import axios from 'axios';

export const createGatherTownSpace = async () => {
  try {
    const payload = {
      name: 'New Space',
    };

    const response = await axios.post(
      'http://localhost:3001/api/gathertown/spaces',
      payload
    );

    console.log('Response from server:', response.data);

    const { spaceId } = response.data;
    return spaceId;
  } catch (error) {
    console.error('Error creating Gather Town space:', error);
    throw new Error('Failed to create space');
  }
};
