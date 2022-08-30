const MainContent = class MainContent {
    constructor() {}
    chooseScreen(target) {
        if (!document.querySelector(`.content__in.isActive [data-target="${target}"]`).dataset.back) {
            console.log(`вперед к ${target}`);
            document.querySelector('.content__in.isActive').classList.add('isSlided');
        } else {
            console.log(`назад к ${target}`);
        }
        document.querySelector('.content__in.isActive').classList.remove('isActive');
        document.querySelector(`[data-screen="${target}"]`).classList.add('isActive')
        document.querySelector(`[data-screen="${target}"]`).classList.remove('isSlided')
    }
    init() {}
    getData() {
      // http://satepais.fvds.ru/local/ajax/json.php
      // http://localhost:3000/json.json
      return fetch('http://satepais.fvds.ru/local/ajax/json.php')
      .then((response) => {
          return response.json()
      })
      .then((data) => {
          console.log(data);
          return data;
      });
    }
}

export default MainContent;