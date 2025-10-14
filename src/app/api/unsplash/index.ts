export const GetImageUrl = async (query: string) => {
  const url = `${process.env.UNSPLASH_BASE_URL}/photos/random?query=${query}&client_id=${process.env.UNSPLASH_ACCESS_KEY}`;

  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
