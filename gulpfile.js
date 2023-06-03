const browserSync = require('browser-sync');

const { watch, series, dest, src, parallel} = require('gulp');

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
   // watch('src/assets/images/**/*', images)
   // watch('src/assets/fonts/**/*', fonts)
}

function clear(){
    return src('build', {read: false})
    .pipe(clean());
}

exports.dev = parallel(browsersync, startWatch, html, css)
exports.build = series(clear, parallel(html, css))


exports.default = parallel(browsersync, startWatch, html, css)


  