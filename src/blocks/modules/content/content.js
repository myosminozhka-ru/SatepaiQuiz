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
      // отправка постом с параметрами в body
      // return fetch(`http://satepais.fvds.ru/local/ajax/stones.php`, {
      //   body: formData,
      //   method: 'post',
      // })

      // временный вариант
      return fetch(`http://satepais.fvds.ru/local/ajax/stones.php?shape=Pear&start=${formData.get('start') || 0}&end=${formData.get('end') || 5}&color=${formData.get('color') || 'D'}&karat=${formData.get('karat') || '10'}&price1=1000&price2=${200000 || formData.get('price') || 200000}`)
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          return data;
      });
    }
    sendStone(formData) {
      return fetch(`http://satepais.fvds.ru/local/ajax/addstones.php`, {
        body: formData,
        method: 'post',
      })
      .then((response) => {
          return response.json();
      })
      .then((data) => {
          return {...data, hasError: false};
      })
      .catch(e => {
        return {error: e, hasError: true};
      });
    }
}

export default MainContent;