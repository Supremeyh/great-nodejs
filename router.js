function route(handle,pathname) {
    console.log('about to route a req for ' + pathname);

    if (typeof handle[pathname] === 'function') {
        handle[pathname]
    } else {
        console.log('no req for ' + pathname)
    }
}

exports.route = route;
