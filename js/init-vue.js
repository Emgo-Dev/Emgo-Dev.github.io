window.onload = function(){

function missingIdentifierFallback( identifier, fallback ){
  console.trace();
  console.log(`Missing identifier ${ identifier }.`);
  return fallback;
}

let VuePosts = new Vue({
  el: '#v',
  data: {
    posts: typeof PostLinks !== 'undefined' ? PostLinks : missingIdentifierFallback('PostLinks', []),
    snippets: typeof CodeLinks !== 'undefined' ? CodeLinks : missingIdentifierFallback('CodeLinks', []),
    links: typeof PostLinks !== 'undefined' && typeof CodeLinks !== 'undefined' ? [...PostLinks, ...CodeLinks] : missingIdentifierFallback('PostLinks & CodeLinks', [])
  },
  methods: {
    loadPost: function( event ){
      event.preventDefault();

      $.ajax({ type: 'GET', url: event.target.href.value, success: function( result ){
        let html = md.makeHtml(result);

        document.querySelector('#PostView').innerHTML = html;
      }});
    }
  },
  components: {
    'PostLink': typeof PostLink !== 'undefined' ? PostLink : missingIdentifierFallback('PostLink', {}),
    'PostButton': typeof PostButton !== 'undefined' ? PostButton : missingIdentifierFallback('PostButton', {}),
    'CodeLink': typeof CodeLink !== 'undefined' ? CodeLink : missingIdentifierFallback('CodeLink', {}),
    'AllLink': typeof AllLink !== 'undefined' ? AllLink : missingIdentifierFallback('AllLink', {}),
    'Copyright': typeof Copyright !== 'undefined' ? Copyright : missingIdentifierFallback('Copyright', {})
  }
});

let VueFooter = new Vue({
  el: '#PageFooter',
  data: {
    copyrightYear: new Date().getFullYear()
  },
  components: {
    'Copyright': Copyright
  }
});

}
