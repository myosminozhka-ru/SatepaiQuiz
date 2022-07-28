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
    init() {
        if (event.target.dataset.target) {
            console.log(event.target.dataset)
            this.chooseScreen(event.target.dataset.target);
        }
    }
}

export default MainContent;