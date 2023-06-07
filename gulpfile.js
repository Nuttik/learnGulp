const browserSync = require('browser-sync');

const { watch, series, dest, src, parallel} = require('gulp');

// Подключаем compress-images для работы с изображениями
const imagecomp = require('compress-images');

// Определяем переменную "preprocessor"
let preprocessor = 'sass'; 

// Подключаем gulp-concat
const concat = require('gulp-concat');

// Подключаем модули gulp-sass и gulp-less
const sass = require('gulp-sass')(require('sass'));
const less = require('gulp-less');

// Подключаем Autoprefixer
const autoprefixer = require('gulp-autoprefixer');

// Подключаем модуль gulp-clean-css
const cleancss = require('gulp-clean-css');

// Подключаем модуль gulp-clean
var clean = require('gulp-clean');

function html() {
    return src('src/index.html')
    .pipe(dest('build'))
    .pipe(browserSync.stream())
}

function css() {
    return src('src/assets/styles/index.css')
    .pipe(dest('build/assets/styles'))
    .pipe(browserSync.stream())
}

function styles() {
	return src('src/assets/styles/' + preprocessor + '/main.' + preprocessor + '') // Выбираем источник: "app/sass/main.sass" или "app/less/main.less"
	.pipe(eval(preprocessor)()) // Преобразуем значение переменной "preprocessor" в функцию
	.pipe(concat('app.min.css')) // Конкатенируем в файл app.min.js
	.pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // Создадим префиксы с помощью Autoprefixer
	.pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } )) // Минифицируем стили
	.pipe(dest('build/assets/styles/')) // Выгрузим результат в папку "app/css/"
	.pipe(browserSync.stream()) // Сделаем инъекцию в браузер
}

function fonts() {
    return src('src/assets/fonts/**/*')
    .pipe(dest('build/assets/fonts/'))
    .pipe(browserSync.stream())
}

async function images() {
	imagecomp(
		"src/assets/images/**/*", // Берём все изображения из папки источника
		"build/assets/images/", // Выгружаем оптимизированные изображения в папку назначения
		{ compress_force: false, statistic: true, autoupdate: true }, false, // Настраиваем основные параметры
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } }, // Сжимаем и оптимизируем изображеня
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) { // Обновляем страницу по завершению
			if (completed === true) {
				browserSync.reload()
			}
		}
	)
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'build'
        }
    })
}

function startWatch() {
    watch('src/**/*.html', html)
    watch('src/assets/styles/**/*.css', css)
    watch('src/assets/images/**/*', images)
    watch('src/assets/fonts/**/*', fonts)
	watch('src/assets/styles/**/' + preprocessor + '/**/*', styles);
}

function clear(){
    return src('build', {read: false})
    .pipe(clean());
}

exports.dev = parallel(browsersync, startWatch, html, css, images, fonts, styles)
exports.build = series(clear, parallel(html, css, images, fonts, styles))


exports.default = parallel(browsersync, startWatch, html, css, images, fonts, styles)

  