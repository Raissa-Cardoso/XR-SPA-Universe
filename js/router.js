export class Router {
  routes = {}

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();

    this.activeNavigation(event)

    window.history.pushState({}, "", event.target.href);
    let path = event.target.href==undefined? "/universe":""
    this.handle(path);
  }

  activeNavigation(event) {
    document.querySelectorAll('a').forEach((element) => {
      element.classList.remove('active')
    })

    event.target.classList.toggle('active')
  }

  changeBackground(event){
    switch(event){
      case '/universe':
        document.getElementById("page").style.backgroundImage= 'var(--url-universe)';
        document.getElementById("app").classList.remove('home');
        break;
      case '/exploration':
        document.getElementById("page").style.backgroundImage= 'var(--url-exploration)';
        document.getElementById("app").classList.remove('home');
        break;
      default:
        document.getElementById("page").style.backgroundImage= 'var(--url-home)';
        document.getElementById("app").classList.add('home');
        break;
    }
  }

  handle(path) {
    const pathname = path || window.location.pathname
    const route = this.routes[pathname] || this.routes[404];
    if (path) { window.history.pushState({}, "", pathname );}

    this.changeBackground(pathname)

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });
  }
}
