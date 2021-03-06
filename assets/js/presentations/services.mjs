import Presentation from '../presentation.mjs';

export default class Rating extends Presentation {

    constructor(props = {}) {

        super(props);

        Object.assign(this.data, {
            title: 'Услуги на PROFILES',
            index: '03',
            header: 'Продвигай свои услуги',
            entrySlide: 'intro'
        });

        this.slides = {
            'intro': {
                html: 'rating/intro',
                init: async () => await this.bindAction('.switch', async () => {
                    document.querySelector('.switch').parentNode.classList.toggle('active', true);
                    this.sleep(2000).then(async () => await this.slide('whatIs'))
                }, 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'whatIs': {
                html: 'services/whatIs',
                init: async () => await this.bindAction('#accreditation', async () => this.slide('accreditation'), 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'accreditation': {
                html: 'services/accreditation',
                init: async () => await this.bindAction('#form', async () => {
                    document.querySelector('#form').classList.toggle('active');
                    document.querySelector('.accreditation').classList.toggle('active');
                    this.sleep(2000).then(async () => this.slide('form'));
                }, 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'form': {
                html: 'services/form',
                init: async () => await this.bindAction('#done', async () => {
                    document.querySelector('#done').classList.toggle('active');
                    await document.querySelector('#name').classList.toggle('typing', true);
                    await this.typeAnimation({
                        node: document.querySelector('#name'),
                        content: 'Название для крутой услуги'
                    });
                    await document.querySelector('#price').classList.toggle('typing', true);
                    await this.typeAnimation({
                        node: document.querySelector('#price'),
                        content: '500 условных единиц'
                    });
                    await document.querySelector('#categories').classList.toggle('typing', true);
                    this.sleep(1500).then(async () => this.slide('done'));
                }, 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(1000);
                }
            },
            'done': {
                html: 'services/done',
                init: async () => await this.bindAction('#acoins', async () => this.slide('acoins'), 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'acoins': {
                html: 'services/acoins',
                init: async () => await this.bindAction('#promo', async () => this.slide('promo'), 4000),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'promo': {
                html: 'services/promo',
                init: async () => {
                    await this.bindAction('#leads', async () => this.slide('leads'), 4000);
                    await this.sleep(500).then(() => this.typeAnimation({
                        node: document.querySelector('#promocode'),
                        content: 'PRODAMGARAJ'
                    }));
                },
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'leads': {
                html: 'services/leads',
                init: async () => {
                    await this.bindAction('#more', async () => this.slide('more'), 4000);
                    await this.sleep(500).then(() => this.typeAnimation({
                        node: document.querySelector('#promocode'),
                        content: 'ssilka_na_tvoy_resurs'
                    }));
                },
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            },
            'more': {
                html: 'a-coin/more',
                init: this.initMorePresentationsSlide.bind(this),
                exit: async () => {
                    document.querySelectorAll('section').forEach(section => section.classList.add('unload'));
                    return await this.sleep(500);
                }
            }
        };

    }

    typeAnimation({node, content = '', duration = 500}) {
        const letters = content.split('');
        const interval = duration / (letters.length - 1);
        return new Promise(resolve => {
            const animationWorker = setInterval(() => {
                if (letters.length === 0) {
                    clearInterval(animationWorker);
                    return resolve(true);
                }
                return node.textContent += letters.shift();
            }, interval);
        });

    }

}