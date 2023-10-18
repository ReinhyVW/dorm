export async function getItemTypes() {
  try {
    const response = await fetch(`${process.env.DB_HOST}/api/itemtypes`, { cache: 'no-cache' });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log(data); // You might want to do something more meaningful with the data

    return data;
  } catch (error) {
    console.error('Error fetching item types:', error);
    throw error;
  }
}
