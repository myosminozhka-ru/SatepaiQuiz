const MainContent = class MainContent {
    constructor() {
      this.currentStep = null
    }
    chooseScreen(target) {
        if (!document.querySelector(`.content__in.isActive [data-target="${target}"]`).dataset.back) {
            console.log(`вперед к ${target}`);
            document.querySelector('.content__in.isActive').classList.add('isSlided');
        } else {
            console.log(`назад к ${target}`);
        }
        this.currentStep = target
        document.querySelector('.content__in.isActive').classList.remove('isActive');
        document.querySelector(`[data-screen="${target}"]`).classList.add('isActive')
        document.querySelector(`[data-screen="${target}"]`).classList.remove('isSlided')
    }
    init() {}
    getData() {
      return fetch('http://satepais.fvds.ru/local/ajax/json.php')
      .then((response) => {
          return response.json()
      })
      .then((data) => {
          return data;
      });
    }
    sendFormData(formData) {
      return fetch('http://satepais.fvds.ru/local/ajax/json.php', {
        body: formData,
        method: 'post',
      })
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          return data;
      });
    }
}

export default MainContent;