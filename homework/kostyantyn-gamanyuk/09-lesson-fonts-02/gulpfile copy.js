'use strict';

//определим переменные для функцийи плагинов
let gulp              = require('gulp'),
    sass              = require('gulp-sass'),                 //препроцессор
    cssmin            = require('gulp-cssmin'),               //минификатор CSS
    prefixer          = require('gulp-autoprefixer'),         //автоматическая расстановка вендорных префиксов
    include           = require('gulp-file-include'),         //импорт одних файлов в другие (работает с HTML, SCSS/CSS и JS, но нужен он нам в основном для импорта HTML)
    browserSync       = require('browser-sync'),              //сервер для отображения в браузере в режиме реального времени
    rename            = require('gulp-rename'),               //переименовывает файлы, добавляет им префиксы и суффиксы
    imagemin          = require('gulp-imagemin'),             //пережимает изображения
    recompress        = require('imagemin-jpeg-recompress'),  //тоже пережимает, но лучше. Плагин для плагина
    uglify            = require('gulp-uglify'),               //то же, что cssmin, только для js
    terser = require('gulp-terser'),                          // вместо gulp-uglify для ES6
    concat            = require('gulp-concat'),               //склеивает css и js-файлы в один
    del               = require('del'),                       //удаляет указанные файлы и директории. Нужен для очистки перед билдом.
    sourcemaps        = require('gulp-sourcemaps'),           //рисует карту слитого воедино файла, чтобы было понятно, что из какого файла бралось
    realFavicon       = require('gulp-real-favicon'),         //https://realfavicongenerator.net/
    fs                = require('fs'),
    FAVICON_DATA_FILE = 'faviconData.json',                   // File where the favicon markups are stored
    purgecss = require('gulp-purgecss');                


    gulp.task('scss', function(){                 //делаем из своего scss-кода css для браузера
     return gulp.src('src/scss/**/*.scss')        //берём все файлы в директории scss и директорий нижнего уровня
     .pipe(sourcemaps.init())                     //инициализируем sourcemaps, чтобы он начинал записывать, что из какого файла берётся
     //.pipe(sass({outputStyle:'compressed'}))
     .pipe(sass({outputStyle:'nested'}))      //конвертируем scss в css и импортируем все импорты
     .pipe(rename({suffix: '.min'}))              //переименовываем файл, чтобы было понятно, что он минифицирован
     .pipe(prefixer({                             //добавляем вендорные префиксы
       overrideBrowserslist: ['last 8 versions'], //последние 8 версий, но можно донастроить на большее или меньшее значение
       browsers: [                                //список поддерживаемых браузеров и их версия - ВНИМАНИЕ! данная опция влияет только на расстановку префиксов и не гарантирут 100% работы сайта в этих браузерах.
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 11",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6"
    ] 
      }))
     .pipe(sourcemaps.write())                    //записываем карту в итоговый файл
     .pipe(gulp.dest('build/css'))                //кладём итоговый файл в директорию build/css
     .pipe(browserSync.reload({stream:true}))     //обновляем браузер
    });

    
    gulp.task('style', function(){                //создаём единую библиотеку из css-стилей всех плагинов
      return gulp.src([                           //указываем, где брать исходники
         'node_modules/normalize.css/normalize.css'
          // 'node_modules/slick-carousel/slick/slick.css',
        //'node_modules/bootstrap/dist/css/bootstrap.min.css',
        // 'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
        // 'node_modules/owl.carousel/dist/assets/owl.theme.default.min.css',
        
      ])
      .pipe(sourcemaps.init())
      .pipe(concat('libs.min.css'))               //склеиваем их в один файл с указанным именем
      .pipe(cssmin())                             //минифицируем полученный файл
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/css'))               //кидаем готовый файл в директорию
    });

    gulp.task('script', function(){                //аналогично поступаем с js-файлами
      return gulp.src([                            //тут подключаем разные js в общую библиотеку. Отключите то, что вам не нужно.
          // 'node_modules/jquery/dist/jquery.js',
        //  'node_modules/slick-carousel/slick/slick.js'
         //'node_modules/bootstrap/dist/js/bootstrap.min.js',
         //
         //'node_modules/@popperjs/core/dist/umd/popper.min.js',
        //  'node_modules/owl.carousel/dist/owl.carousel.min.js',
      ])
      .pipe(sourcemaps.init())
      .pipe(concat('libs.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('build/js'))
    });

    gulp.task('minjs', function(){                //минифицируем наш main.js и перекидываем в директорию build для ES6 - использовать uglify
      return gulp.src(['src/js/*.js'])
      // .pipe(uglify())
      .pipe(terser())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('build/js')) 
    });

    gulp.task('js', function(){                   //обновляем браузер, если в наших js файлах что-то поменялось
      return gulp.src('src/js/**/*.js')
      .pipe(browserSync.reload({stream: true})) 
    });
    
    gulp.task('html', function(){                 //собираем html из кусочков
      return gulp.src(['src/**/*.html', '!src/components/**/*.html'])
      .pipe(sourcemaps.init())
     .pipe(include({                              //импортируем файлы с префиксом @@. ПРефикс можно настроить под себя.
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/'))
    .pipe(browserSync.reload({stream:true}));
    });

    gulp.task('fonts', function(){                 //перекидываем шрифты из директории src в build, а заодно следим за новыми файлами, чтобы обновлять браузер, когда появляется шрифт
      return gulp.src('src/fonts/**/*.+(eot|svg|ttf|woff|woff2|min.css)')
      .pipe(gulp.dest('build/fonts'))
      .pipe(browserSync.reload({stream:true}));
    });

    gulp.task('generate-favicon', function(done) {
      realFavicon.generateFavicon({
        masterPicture: 'src/master_favicon.svg',           //путь к вашей основной картинке. Например, assets/images/master_picture.png.
        dest: 'build/favicon', //каталог, в котором будут созданы значки и связанные файлы. Например, dist/images/icons.
        iconsPath: '/',
        design: {
          ios: {
            pictureAspect: 'noChange',
            assets: {
              ios6AndPriorIcons: false,
              ios7AndLaterIcons: false,
              precomposedIcons: false,
              declareOnlyDefaultIcon: true
            }
          },
          desktopBrowser: {
            design: 'raw'
          },
          windows: {
            pictureAspect: 'noChange',
            backgroundColor: '#da532c',
            onConflict: 'override',
            assets: {
              windows80Ie10Tile: false,
              windows10Ie11EdgeTiles: {
                small: false,
                medium: true,
                big: false,
                rectangle: false
              }
            }
          },
          androidChrome: {
            pictureAspect: 'noChange',
            themeColor: '#ffffff',
            manifest: {
              display: 'standalone',
              orientation: 'notSet',
              onConflict: 'override',
              declared: true
            },
            assets: {
              legacyIcon: false,
              lowResolutionIcons: false
            }
          },
          safariPinnedTab: {
            pictureAspect: 'silhouette',
            themeColor: '#5bbad5'
          }
        },
        settings: {
          scalingAlgorithm: 'Mitchell',
          errorOnImageTooSmall: false,
          readmeFile: false,
          htmlCodeFile: false,
          usePathAsIs: false
        },
        markupFile: FAVICON_DATA_FILE
      }, function() {
        done();
      });
    });
    
    // Inject the favicon markups in your HTML pages. You should run
    // this task whenever you modify a page. You can keep this task
    // as is or refactor your existing HTML pipeline.
    // gulp.task('inject-favicon-markups', function() {
    //   return gulp.src([ 'src/components/_head.html' ]) //списком HTML-файлов, куда добавить разметку favicon. Например, ['dist/*.html', 'dist/misc/*.html'].
    //     .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    //     .pipe(gulp.dest('build'));// каталог, в котором будут создаваться обработанные файлы HTML. Например, dist.
    // });
    
    // Check for updates on RealFaviconGenerator (think: Apple has just
    // released a new Touch icon along with the latest version of iOS).
    // Run this task from time to time. Ideally, make it part of your
    // continuous integration system.
    gulp.task('check-for-favicon-update', function(done) {
      var currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
      realFavicon.checkForUpdates(currentVersion, function(err) {
        if (err) {
          throw err;
        }
      });
    });

    gulp.task('images', function(){               //пережимаем изображения и складываем их в директорию build
      return gulp.src('src/img/**/*.+(png|jpg|jpeg|gif|svg|ico)')
      .pipe(imagemin([
        recompress({                              //Настройки сжатия изображений. Сейчас всё настроено так, что сжатие почти незаметно для глаза на обычных экранах. Можете покрутить настройки, но за результат не отвечаю.
          loops: 4,                               //количество прогонок изображения
          min: 70,                                //минимальное качество в процентах
          max: 80,                                //максимальное качество в процентах
          quality: 'high'                         //тут всё говорит само за себя, если хоть капельку понимаешь английский
        }),
        imagemin.gifsicle(),                      //тут и ниже всякие плагины для обработки разных типов изображений
        imagemin.optipng(),
        imagemin.svgo()
      ]))
      .pipe(gulp.dest('build/img'))
      .pipe(browserSync.reload({stream:true}));
    });

    gulp.task('deletefonts', function() {       //задачи для очистки директории со шрифтами в build. Нужна для того, чтобы удалить лишнее.
      return del('build/fonts/**/*.*');
    });

    gulp.task('deleteimg', function() {         //аналогично предыдущей, но с картинками.
      return del('build/img/**/*.*');
    });

    gulp.task('cleanfonts', gulp.series('deletefonts', 'fonts')); //задачи нужна для того, чтобы сразу очистить директорию и залить шрифты по-новой

    gulp.task('cleanimg', gulp.series('deleteimg', 'images')); //задачи нужна для того, чтобы сразу очистить директорию и залить картинки по-новой
    
    gulp.task('purgecss', () => {
      return gulp
       .src('src/**/*.css')
       .pipe( 
       purgecss({
       content: ['src/**/*.html']
       })
       )
       .pipe(gulp.dest('build/cl.css'))
      })


    gulp.task('watch', function(){ //Следим за изменениями в файлах и директориях и запускаем задачи, если эти изменения произошли
      gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
      gulp.watch('src/**/*.html', gulp.parallel('html'));
      gulp.watch('src/fonts/**/*.*', gulp.parallel('fonts'));
      gulp.watch('src/js/**/*.js', gulp.parallel('minjs', 'js'));
      gulp.watch('src/img/**/*.*', gulp.parallel('images'));
    });



    gulp.task('browser-sync', function() { //настройки лайв-сервера
      browserSync.init({
          server: {
              baseDir: "build/" //какую папку показывать в браузере
          },
          browser: ["chrome"], //в каком браузере
          //tunnel: " ", //тут можно прописать название проекта и дать доступ к нему через интернет. Работает нестабильно, запускается через раз. Не рекомендуется включать без необходимости.
          //tunnel:true, //работает, как и предыдущяя опция, но присваивает рандомное имя. Тоже запускается через раз и поэтому не рекомендуется для включения
          host: "192.168.0.104" //IP сервера в локальной сети. Отключите, если у вас DHCP, пропишите под себя, если фиксированный IP в локалке.
      });
    });

    gulp.task('default', gulp.parallel('browser-sync', 'watch', 'scss', 'style',  'minjs', 'html', 'fonts', 'cleanfonts', 'cleanimg')) //запускает все перечисленные задачи разом