(function () {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  let contraste = select('.contraste')
  if (contraste) {
    const toggleContraste = () => {
      contraste.classList.add('active')
    }
    window.addEventListener('load', toggleContraste)
    onscroll(document, toggleContraste)
  }
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      backtotop.classList.add('active')
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }
  let acessibilidade = select('.acessibilidade')
  if (acessibilidade) {
    const toggleAcessibilidade = () => {
      acessibilidade.classList.add('active')
    }
    window.addEventListener('load', toggleAcessibilidade)
    onscroll(document, toggleAcessibilidade)
  }
  on('click', '.mobile-nav-toggle', function (e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

let cont=1;
  on('click', '#contraste', function (e) {
    this.classList.toggle('bi-eye');
    this.classList.toggle('bi-eye-slash');
    cont++;
    if(cont%2==0){
        let body = document.getElementsByTagName("BODY")[0];
        let html = document.getElementsByTagName("HTML")[0];
        html.style.backgroundColor = "#303000";
        body.style.backgroundColor = "black";
        body.style.color = "#f0e000";
        let tags = ["FOOTER", "HEADER", "MAIN", "SECTION",
            "NAV", "FORM",
            "FONT", "EM", "B", "I", "U",
            "INPUT", "P", "BUTTON", "OL", "UL", "A", "DIV",
            "TD", "TH", "SPAN", "LI",
            "H1", "H2", "H3", "H4", "H5", "H6",
            "DD", "DT",
            "INCLUDE-FRAGMENT", "ARTICLE", "SPAN"
        ];
        for (let tag of tags) {
            for (let item of document.getElementsByTagName(tag)) {
                item.style.backgroundColor = "black";
                item.style.color = "#ffe000";
            }
        }
        for (let tag of ["BUTTON", "I"]) {
            for (let item of document.getElementsByTagName(tag)) {
                item.style.backgroundColor = "yellow";
                item.style.color = "black";
            }
        }
        for (let tag of document.getElementsByTagName("INPUT")) {
            tag.style.border = "solid 1px #bbb";
        }
        let videos = document.getElementsByTagName("VIDEO");
        for (let video of videos) {
            video.style.backgroundColor = "black";
        }
        for (let tag of document.getElementsByTagName("TH")) {
            tag.style.borderBottom = "solid 1px yellow";
        }
        for (let tag of document.getElementsByTagName("A")) {
            tag.style.color = "cyan";
        }
      }else{
        document.location.reload(true);
      }
  })

  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  const botaoContraste = document.getElementById('contraste');
  botaoContraste.addEventListener("onclick", function () {
    $("body")
      .css("background-color", "black")
      .css("color", "white")

  });

  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function (direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
}
)()