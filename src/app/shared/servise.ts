export class Servise {
    //Вычисление окончания слова ' Фильм'
    setQuantityText(counter) {
        if (( counter % 100 > 4 && counter % 100 < 20 ) || counter % 10 === 0 || counter % 10 > 4 ) {
            return `В избранном: ${counter} фильмов. `;
        } else if ( counter % 10 < 5 && counter % 10 > 1 ) {
            return `В избранном: ${counter} фильма. `;
        } else {
            return `В избранном: ${counter} фильм. `;
        }
    } 
}