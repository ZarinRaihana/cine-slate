function useSelectedGenre(selectedGenres) {

    if(selectedGenres < 1) return "";

    const genreID = selectedGenres.map((genre) => genre.id);

    return genreID.reduce((acc, current) => acc + ',' + current);
}

export default useSelectedGenre
