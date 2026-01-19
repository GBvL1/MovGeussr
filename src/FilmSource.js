import { API_URL, API_KEY } from "./apiConfig.js";


const options = {
    method: "GET",
    headers: {
        "X-RapidAPI-Key": API_KEY,
        "X-RapidAPI-Host": "imdb236.p.rapidapi.com",
    },
};


export function getRandomMovie(numberOfFilms){
      
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
        }

    return fetchFromAPI("top250-movies").then(movieFromResponseACB).catch(handleErrorACB);


    function movieFromResponseACB(top250Data){ 

        let movieList = [...top250Data]
        let randomMovieList = []
        let randomNumber = getRandomInt(250)

        let numberList = [] 
        for (let i = 0; i < numberOfFilms; i++){

            do {
                randomNumber = getRandomInt(250);
            } while (numberList.includes(randomNumber));
            
            numberList.push(randomNumber);
    
            randomMovieList.push(movieList[randomNumber])
        }
        
        return randomMovieList;
    }


    function handleErrorACB(error){
        console.error(error)
    }

}

export function getCastFromID(ID){

        return fetchFromAPI(ID).then(printCast).catch(handleErrorACB);

        function printCast(detailsList){        
            return detailsList.cast;
        }

        function handleErrorACB(error){
            console.error(error)
            return [];
        }        
    }

export function getRandomMoviesWithCast(numberOfFilms){

    return getRandomMovie(numberOfFilms).then(addCastToMoviesACB);

    function addCastToMoviesACB(randomMovieList){

        let currentPromise = Promise.resolve([]);

        for (let i = 0; i < randomMovieList.length; i++){
            const movie = randomMovieList[i];
            
            currentPromise = currentPromise.then(fetchNextCastACB);
                
                function fetchNextCastACB(moviesWithCast){
                return getCastFromID(movie.id)
                    .then(function attachCastACB(castArray){
                        const movieWithCast = Object.assign({}, movie, {cast: castArray});
                        
                        const newArray = moviesWithCast.slice();
                        newArray.push(movieWithCast);
                        
                        return newArray;
                    });
            }
        
        }

        return currentPromise;
    }
}


export function fetchFromAPI(query) {
    const url = `${API_URL}${query}`; 

    return fetch(url, options).then(gotResponseACB).then(responseDataACB);


    function gotResponseACB(response){
        if (!response.ok) throw new Error("Response not ok")
            
        return response.json();
    }

    function responseDataACB(data){

        return data;
    }


}