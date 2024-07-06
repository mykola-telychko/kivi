function splitArrayElements(array) {
    const result = [];
    
    for (let i = 0; i < array.length; i++) {
      const words = array[i].split(' ');
      result.push(...words);
    }
    
    return result;
  }
  
  // Приклад використання:
  const ukrainianNames = [
    'Ivan Petrov',
    'Maria Sidorova',
    'Vasyl Kovalenko',
    'Olena Lysenko',
    'Andrii Kozlov',
    'Nataliia Moroz',
    'Mykhailo Pavlenko',
    'Sofia Shevchenko',
    'Yurii Zaitsiv',
    'Tetiana Kravchenko',
    'Oleh Honchar',
    'Iryna Kuzmenko',
    'Serhii Boiko',
    'Anna Doroshenko',
    'Dmytro Hryhorenko',
    'Liudmyla Tkachenko',
    'Roman Savchenko',
    'Kateryna Levchenko',
    'Vitalii Rudenko',
    'Yevhen Melnyk',
    'Olha Fedorenko',
    'Pavlo Shevtsov',
    'Halyna Mazur',
    'Artem Korol',
    'Larysa Myronenko',
    'Ihor Shapoval',
    'Tetiana Polyakova',
    'Ruslan Serhiienko',
    'Alla Kotsiubynska',
    'Yaroslav Onopko',
    'Lidiia Bondarenko',
    'Volodymyr Frolov',
    'Nina Hrytsenko',
    'Andrii Panchenko',
    'Oksana Tereshchenko',
    'Anatolii Havryliuk',
    'Maryna Martynenko',
    'Serhii Lys',
    'Tamara Popova',
    'Vladyslav Bilous',
    'Liubov Kostenko',
    'Viktor Semenov',
    'Nina Bilenka',
    'Oleksii Riabokon',
    // Додайте інші імена та прізвища тут
  ];
  

  
  const outputArray = splitArrayElements(ukrainianNames);
  console.log(outputArray);
  function splitArrayElements(array) {
    const result = [];  
    for (let i = 0; i < array.length; i++) {
      const words = array[i].split(' ');
      result.push(...words);
    }
    return result;
  }