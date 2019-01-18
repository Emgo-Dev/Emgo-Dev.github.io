let HomePage = new Vue({
  el: '#vue-home',
  data: {
    posts: typeof PostLinks !== 'undefined' ? PostLinks : (logError('PostLinks is undefined.'), []),
    snippets: typeof CodeLinks !== 'undefined' ? CodeLinks : (logError('CodeLinks is undefined.'), []),
    viewLinks: ['Posts', 'Code'],
    views: ['Post Links', 'Code Links', 'Post', 'Code'],
    currentView: 'Post Links',

    copyrightYear: new Date().getFullYear(),

    page: {
      width: config['home-page-width']
    },

    viewer: {
      views: ['Post', 'Code'],
      view: 0,
      code: {
        src: ''
      },

      code: {
        current: '',
        history: []
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
    pageHeight: function(){ return getHtmlNode('.page .content-window').offsetHeight; }
  },
  methods: {
    /* openCode */addCodeUriToViewer: function( uri ){
      this.reactifyCodeUri(uri);
    },
    addCodeUriToHistory: function( uri ){
      this.viewer.code.history.push(uri);
    },
    /* addPostToHistory */addPostUriToHistory: function( uri ){
      this.viewer.post.history.push(uri);
    },
    /* getPost */addPostHtmlToViewer: function( uri ){
      const reactifyPostHtml = this.reactifyPostHtml;
      this.viewer.post.current = uri;

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
      this.switchView(1);
    },
    /* getView */getViewName: function( i ){
      if( typeof i === 'number' && i < this.viewer.views.length ){
        return this.viewer.views[i];
      }else{
        return false;
      }
    },
    /* matchView */checkCurrentView: function( i ){
      return this.viewer.view === i;
    },
    goToPreviousCode: function(){
      const thereAreItemsInHistory = this.viewer.code.history.length > 0;
      const currentCodeIsMostRecent = this.viewer.code.history.lastIndexOf(this.viewer.code.current) > -1;

      console.log('Current code: ', this.viewer.code.current, currentCodeIsMostRecent);

      if( thereAreItemsInHistory ){
        if( currentCodeIsMostRecent ){
          this.viewer.code.history.pop()
        }

        this.addCodeUriToViewer(this.viewer.code.history.pop());
      }
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
      this.switchView(0);
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
      const getCurrentView = () => this.viewer.view,
      getCurrentViewIndex = ( s ) => this.viewer.views.indexOf(s);

        console.log('Previous View: ' + getCurrentView() + '(' + getCurrentViewIndex(getCurrentView()) + ')');
      this.viewer.view = this.viewer.views[i] ? i : getCurrentView();
        console.log('New View: ' + getCurrentView() + '(' + getCurrentViewIndex(getCurrentView()) + ')');
    },
    viewerLinkHandler: function( viewIndex ){
      this.switchView(viewIndex);
    }
  },
  components: {
    'SidebarPostList': typeof SidebarPostList !== 'undefined' ? SidebarPostList : (logError('SidebarPostList is undefined.'), {}),
    'SidebarCodeList': typeof SidebarPostList !== 'undefined' ? SidebarPostList : (logError('SidebarCodeList is undefined.'), {}),
    'ScrolldownNotifier': typeof ScrolldownNotifier !== 'undefined' ? ScrolldownNotifier : (logError('ScrolldownNotifier is undefined.'), {}),
    'Viewer': typeof Viewer !== 'undefined' ? Viewer : (logError('Viewer is undefined.'), {}),
    'CodeViewer': typeof CodeView !== 'undefined' ? CodeView : (logError('CodeViewer is undefined.'), {}),
    'LinkView': typeof LinkView !== 'undefined' ? LinkView : (logError('LinkViewer is undefined.'), {}),
    'LinkItem': typeof LinkItem !== 'undefined' ? LinkItem : (logError('HomePageLinkItem is undefined.'), {}),
    'CodeItem': typeof CodeItem !== 'undefined' ? CodeItem : (logError('HomePageCodeItem is undefined.'), {}),
    'Copyright': typeof Copyright !== 'undefined' ? Copyright : (logError('Copyright is undefined.'), {})
  }
});

getHtmlNode('.page .content-window').addEventListener('scroll', function(e){
  console.log(e.target.scrollTop, e.target.scrollTopMax);
  if( e.target.scrollTop > e.target.scrollTopMax - 25 ){ getHtmlNode('.scroll-notifier').classList.remove('active'); }
  else{ getHtmlNode('.scroll-notifier').classList.add('active'); }
});
