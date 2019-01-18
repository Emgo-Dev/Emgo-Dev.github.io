function getHtmlNode( selector ){
  return document.querySelector(selector);
}

function getHtmlNodes( selector ){
  /* Other than NodeList.item, Array is not lacking nothing but
     has more methods. */
  return [...document.querySelectorAll(selector)];
}

function logError( msg ){
  if( typeof msg !== 'string' ){ msg = ''; }
  console.trace();
  console.log(msg);
}

function logMessage( msg ){
  if( typeof msg !== 'string' ){ msg = ''; }
  console.log(msg);  
}

function log( logObj ){
  const actions = {
    'table': function( a ){
      console.table( a );
    }
  };

  /* logObj.action: a string, used as an index in actions, to call a
     pre-determined scoped function for handling that requested 'action'. */
  /* logObj.payload: a 'fancy' way of referring to some data passed from
     one carrier to another. It is the data meant to be used in the action. */
  /* actions only accept one payload, for simplicity. If a user has a desire
     to iterate over more than one payload, it should be done on their end, 
     ie: ['a', 'b', 'c'].forEach((d,i,a)=>log(d)).
     Is this a good rule-of-thumb for all functionaly-oriented-functions?
     Perhaps so, perhaps not always, some functions are designed to be iterative,
     or recursive at the very least...most? Either way, there is not one answer. 
     It is unnecessary in this example, and most like it. */
  actions[logObj.action](logObj.payload);
}

/*
  Search a given DOM Node's prototype chain for str
  as constructor.name value.
*/
function findPrototype( obj, str, proto, i ){
  if( !i ){
    i = 0;
    proto = obj.__proto__;
  }

  const protoString = proto.constructor.name.toLowerCase();

  if( protoString === str.toLowerCase() ){
    return true;
  }

  if( protoString === 'object' ){
    return false;
  }

  return findPrototype( obj, str, proto.__proto__, ++i );
}

function addAttribute( node, attribute, value ){
  let fail = 0;

  if( !findPrototype(node, 'HTMLElement') ){
    logError('First argument must be an HTML Element.');
    fail = 1;
  }

  if( typeof attribute !== 'string' ){
    logError('Second argument must be a string.');
    fail = 1;
  }

  if( fail ){ return undefined; }

  node.setAttribute(attribute, ( typeof value === 'string' || '' ));
}

function addToAttribute( node, attribute, value ){
  let fail = 0;

  if( !findPrototype(node, 'HTMLElement') ){
    logError('First argument must be an HTML Element.');
    fail = 1;
  }

  if( typeof attribute !== 'string' ){
    logError('Second argument must be a string.');
    fail = 1;
  }

  if( fail ){ return undefined; }

  const oldAttributeValue = node.attributes[attribute] ? node.attributes[attribute].value : '';

  node.setAttribute(( attribute || '' ), oldAttributeValue + ( ' ' + value || '' ));
}

function updateConfig( key, value ){
  localStorage.setItem(key, value);
}

function getConfig( key, value ){
  return localStorage.getItem(key, value);
}

/*
  How to use above functions in page:

  These will update save users chosen values when config is changed.
  Note the config file isn't actually changed from default.
  updateConfig('home-page-width', '15%');
  updateConfig('home-viewer-width', '85%');

  This applies changes to the page.
  addToAttribute(getHtmlNode('.page'), 'style', `width: ${ localStorage.getItem('home-page-width') }`);
  addToAttribute(getHtmlNode('.viewer'), 'style', `width: ${ localStorage.getItem('home-viewer-width') }`);
*/
