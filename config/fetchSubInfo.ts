const fetchLanguages = async () => {
    const response = await fetch('https://api.github.com/languages');
    let data = await response.json();
    data = ['Vietnamese', 'English', 'French'];
    return data;
};

const fetchHometowns = async () => {
    const response = await fetch('https://api.github.com/hometowns');
    let data = await response.json();
    data = ['Da Nang, Vietnam', 'Hanoi, Vietnam', 'Ho Chi Minh City, Vietnam'];
    return data;
};

export { fetchLanguages, fetchHometowns };
