window.onload = function(){
let HomePage = new Vue({
  el: '#vue-home',
  data: {
    posts: typeof PostLinks !== 'undefined' ? PostLinks : (logError('PostLinks is undefined.'), []),
    snippets: typeof CodeLinks !== 'undefined' ? CodeLinks : (logError('CodeLinks is undefined.'), []),
    views: ['Post Links', 'Code Links', 'Post', 'Code'],
    currentView: 'Post Links',

    copyrightYear: new Date().getFullYear(),

    page: {
      width: config['home-page-width']
    },

    viewer: {
      code: {
        src: ''
      },

      post: {
        content: '',
        current: '',
        fontSize: 1,
        history: []
      },

      width: config['home-viewer-width']
    }
  },
  computed: {
    pageWidth: function(){ return 'width: ' + this.page.width + '%;'; },
    viewerWidth: function(){ return 'width: ' + this.viewer.width + '%;'; },
    viewerFontSize: function(){ return 'font-size: ' + this.viewer.post.fontSize + 'em;'; },
    page: function(){ return { width: 'width: ' + this.p.w + '%;' } },
  },
  methods: {
    /* openCode */addCodeUriToViewer: function( uri ){
      this.reactifyCodeUri(uri);
    },
    /* addPostToHistory */addPostUriToHistory: function( uri ){
      this.viewer.post.history.push(uri);
      this.viewer.post.current = uri;
    },
    /* getPost */addPostHtmlToViewer: function( uri ){
      const reactifyPostHtml = this.reactifyPostHtml;

      $.ajax({ type: 'GET', dataType: 'html', url: uri, success: function( result ){
        let html = new DOMParser().parseFromString(result, 'text/html');

        html.querySelectorAll('pre code').forEach(function(block, i) {
          hljs.highlightBlock(block);
        });

        reactifyPostHtml(result);
      }});
    },
    /* setPostFontSize */changePostViewerFontSize: function( i ){
      this.viewer.post.fontSize += i;
    },
    codeLinkHandler: function( uri ){
      this.addCodeUriToViewer(uri);
      this.reactifyCodeUri(uri);
      this.switchView(3);
    },
    /* getView */getViewName: function( i ){
      if( typeof i === 'number' && i < this.views.length ){
        return this.views[i];
      }else{
        return false;
      }
    },
    /* matchView */checkCurrentView: function( i ){
      return this.currentView === this.getViewName(i);
    },
    /* openPreviousPost */goToPreviousPost: function(){
      const thereAreItemsInHistory = this.viewer.post.history.length > 0;
      const currentPostIsMostRecent = this.viewer.post.history.lastIndexOf(this.viewer.post.current) > -1;

      console.log('Current post: ', this.viewer.post.current, currentPostIsMostRecent);

      if( thereAreItemsInHistory ){
        if( currentPostIsMostRecent ){
          this.viewer.post.history.pop()
        }

        this.addPostHtmlToViewer(this.viewer.post.history.pop());
      }
    },
    /* postHandler */postLinkHandler: function( uri ){
      this.addPostHtmlToViewer(uri);
      this.addPostUriToHistory(uri);
      this.switchView(2);
      this.viewer.post.open = true;
      console.log('Clicked on: ', uri, 'Post history: ', this.viewer.post.history);
    },
    /* loadCode */reactifyCodeUri: function( uri ){
      this.viewer.code.src = uri;
    },
    /* reactifyPostHtml */reactifyPostHtml: function( result ){
      this.viewer.post.content = result;
    },
    switchView: function( i ){
      const cv = () => this.currentView, cvi = ( s ) => this.views.indexOf(s);
      console.log('Previous View: ' + cv() + '(' + cvi(cv()) + ')');
      this.currentView = this.getViewName(i) ? this.getViewName(i) : cv();
      console.log('New View: ' + cv() + '(' + cvi(cv()) + ')');
    },
    viewerLinkHandler: function( viewIndex ){
      this.switchView(viewIndex);
    }
  },
  components: {
    'Viewer': typeof Viewer !== 'undefined' ? Viewer : (logError('Viewer is undefined.'), {}),
    'CodeViewer': typeof CodeView !== 'undefined' ? CodeView : (logError('CodeViewer is undefined.'), {}),
    'LinkView': typeof LinkView !== 'undefined' ? LinkView : (logError('LinkViewer is undefined.'), {}),
    'LinkItem': typeof LinkItem !== 'undefined' ? LinkItem : (logError('HomePageLinkItem is undefined.'), {}),
    'Copyright': typeof Copyright !== 'undefined' ? Copyright : (logError('Copyright is undefined.'), {})
  }
});
}
