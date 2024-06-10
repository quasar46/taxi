import './fonts/fonts.scss';
// import Swiper from 'swiper';
// import intlTelInput from 'intl-tel-input';
import { Navigation, Pagination } from 'swiper/modules';
import Swiper from 'swiper/bundle';
// import customSelect from 'custom-select';
// import Accordion from 'accordion-js';
// import tabs from 'tabs';
// import { disablePageScroll, enablePageScroll } from 'scroll-lock';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
// import 'accordion-js/dist/accordion.min.css';
// import 'intl-tel-input/build/css/intlTelInput.css';
import './scss/styles.scss';
// import fslightbox from 'fslightbox';
import './static/js/mask';
import "./static/js/yamap";
import "./static/js/btn-up";
import "./static/js/anchor";


document.addEventListener('DOMContentLoaded', function () {
	const burgerBtn = document.querySelector('.burger-menu');
	const menu = document.querySelector('.main-menu')
	const overlay = document.querySelector('.overlay')
	const closeMenuBtn = document.querySelector('.main-menu__close')

	function closeMenu() {
		menu.classList.remove('show')
		overlay.classList.remove('show')
	}

	function openMenu() {
		menu.classList.add('show')
		overlay.classList.add('show')
	}

	burgerBtn.addEventListener('click', () => {
		openMenu()
	})

	closeMenuBtn.addEventListener('click', function () {
		closeMenu()
	})

	document.addEventListener('click', (e) => {
		const target = e.target;
		if (target.classList.contains('overlay')) {
			closeMenu()
		}
	})

	if (window.innerWidth < 1024) {
		const swiper = new Swiper('.swiper-last-news', {
			spaceBetween: 24,
			slidesPerView: 'auto',
		})
	}

	const swiper2 = new Swiper('.swiper-recomendation', {
		slidesPerView: 3,
		spaceBetween: 24,
		breakpoints: {
			641: {
				slidesPerView: 3,
			},
			0: {
				slidesPerView: "auto",
			}
		}
	})

	if (window.innerWidth < 1024) {
		const swiper3 = new Swiper('.info-block__content', {
			slidesPerView: "auto",
			spaceBetween: 24,
			breakpoints: {
				640: {
					spaceBetween: 24,
				},
				0: {
					spaceBetween: 16,
				}
			}
		})
	}

	var elements = document.querySelectorAll('.phone');
	elements.forEach(element => {
		var maskOptions = {
			mask: '+7(000)000-00-00',
			lazy: false
		}
		var mask = new IMask(element, maskOptions);
	})

	// animation
	if (document.querySelector('.animation')) {

		if (window.innerWidth < 640) {
			addEventListener('scroll', () => {
				document.body.style.setProperty('--scroll', window.scrollY - 4000 + 'px');
			})
		} else {
			addEventListener('scroll', () => {
				document.body.style.setProperty('--scroll', window.scrollY - 2000 + 'px');
			})
		}
	}

	if (document.querySelector('.quiz')) {

		const quiz = document.querySelector('.quiz')
		const count = document.querySelector('.quiz__count')
		const countTotal = document.querySelector('.quiz__count-total')
		const countCurrent = document.querySelector('.quiz__count-current')
		const quizItemsCount = document.querySelectorAll('.quiz__item').length
		const quizNextBtns = document.querySelectorAll('.quiz__next')
		const quizBackBtns = document.querySelectorAll('.quiz__back')
		const quizItems = document.querySelectorAll('.quiz__item')

		countTotal.innerText = quizItemsCount;


		quizItems.forEach((item, i) => {
			if (item.querySelector('.quiz__next')) {
				item.querySelector('.quiz__next').addEventListener('click', function () {
					countCurrent.innerText = i + 2
					item.classList.remove('active')
					item.nextElementSibling.classList.add('active')
				})
			}

			if (item.querySelector('.quiz__back')) {
				item.querySelector('.quiz__back').addEventListener('click', function () {
					countCurrent.innerText = i
					item.classList.remove('active')
					if (item.previousElementSibling.classList.contains('quiz__item') == true) {
						item.previousElementSibling.classList.add('active')
					} else {
						return;
					}
				})
			}
		})

	}

	const openModalBtns = document.querySelectorAll('.open-modal')
	const closeModalBtns = document.querySelectorAll('.modal__close')
	const modalFeedback = document.querySelector('.modal-feedback')
	openModalBtns.forEach(btn => {
		btn.addEventListener('click', function () {
			modalFeedback.classList.add('show')
			overlay.classList.add('show')
			menu.classList.remove('show')
		})
	})

	closeModalBtns.forEach(btn => {
		btn.addEventListener('click', function () {
			this.closest('.modal').classList.remove('show')
			overlay.classList.remove('show')
		})
	})

})