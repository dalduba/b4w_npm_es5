"use strict"

b4w.register("b4w_npm_test", function(exports, require) {
// импортируем необходимые модули
var m_app       = b4w.require("app");
var m_cfg       = b4w.require("config");
var m_data      = b4w.require("data");
var m_preloader = b4w.require("preloader");

var DEBUG = true;

// задаем путь к ассетам
var APP_ASSETS_PATH = "assets/";
// задаем путь к физическому движку
m_cfg.set("physics_uranium_path", "node_modules/blend4web/dist/uranium/")

/**
 * экспотрируем метод инициализации, который будет вызван в самом конце файла
 */
exports.init = init;
function init() {
    m_app.init({
        canvas_container_id: "main_canvas_container",
        callback: init_cb,
        show_fps: DEBUG,
        console_verbose: DEBUG,
        autoresize: true
    });
}

/**
 * коллбэк вызывается когда приложение инициализировалось
 */
function init_cb(canvas_elem, success) {

    if (!success) {
        console.log("b4w init failure");
        return;
    }

    m_preloader.create_preloader();

    // игнорируем клик правой кнопкой мыши на элементе canvas
    canvas_elem.oncontextmenu = function(e) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    };

    load();
}

/**
 * загрузка данных сцены
 */
function load() {
    m_data.load(APP_ASSETS_PATH + "main.json", load_cb, preloader_cb);
}

/**
 * обновление прелоадера
 */
function preloader_cb(percentage) {
    m_preloader.update_preloader(percentage);
}

/**
 * коллбэк вызывается когда сцена загружена
 */
function load_cb(data_id, success) {

    if (!success) {
        console.log("b4w load failure");
        return;
    }

    m_app.enable_camera_controls();

    // размещайте свой код здесь
}
})

b4w.require("b4w_npm_test").init();
