/**
 * Create namespace module
 */
var JSTEST = (function(){

	/*
		Privates
	 */

	/*
		Public utility methods
	 */
	return {

		// Document ready method
		domReady: function(f){
			/in/.test(document.readyState) ? setTimeout('JSTEST.domReady('+f+')',9) : f();
		},

		// getElementById shortcut
		node: function(id){
			return document.getElementById(id);
		},

		// X-browser addEvent and removeEvent - courtesy of John Resig
		addEvent: function(obj, type, fn) {
			if (obj.attachEvent) {
				obj['e'+type+fn] = fn;
				obj[type+fn] = function(){obj['e'+type+fn](window.event);}
				obj.attachEvent('on'+type, obj[type+fn]);
			} else {
				obj.addEventListener(type, fn, false);
			}
		},
		removeEvent: function(obj, type, fn) {
			if ( obj.detachEvent ) {
				obj.detachEvent('on'+type, obj[type+fn]);
				obj[type+fn] = null;
			} else {
				obj.removeEventListener(type, fn, false);
			}
		},

		// Cancel an events default action
		cancelEvent: function(e){
			if (e.preventDefault) {
				e.preventDefault();
			} else {
				e.returnValue = false;
			}
			return false;
		},

		// Get elements by attribute
		getElementsByAttribute: function(attr, root, tag){
			root = (root || document);
			var matches = [];
			var search = root.getElementsByTagName(tag || '*');
			for (var i = 0; i < search.length; i++){
				if (search[i].getAttribute(attr) != null){
					matches.push(search[i]);
				}
			}
			return matches;
		},

		// Get the next sibling node (skip whitespace)
		getNextSibling: function(node){
			var ele = node.nextSibling;
			while (ele.nodeType != 1){
				ele = ele.nextSibling;
			}
			return ele;
		},

		// Has an element a given class?
		hasClass: function(ele, cls){
			var className = " " + cls + " ";
			if ((" " + ele.className + " ").replace(/[\n\t\r]/g, " ").indexOf(className) > -1) {
				return true;
			}
			return false;
		},

		// Remove a class name
		removeClass: function(ele, cls){
			if (this.hasClass(ele, cls)) {
				var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
				ele.className=ele.className.replace(reg,' ');
			}
		},

		// Add a class name
		addClass: function(ele, cls){
			if (!this.hasClass(ele, cls)){
				ele.className += ' ' + cls;
			}
		},

		// Console.log wrapper
		log: function(){
			if(window.console){
				console.log(Array.prototype.slice.call(arguments));
			}
		},

		// Validate required fields
		validateRequireds: function(node){

			var valid = true;
			var requireds = this.getElementsByAttribute('required', node, 'input');
			for (var i in requireds){
				var fld = requireds[i];

				// Remove any previous validation msg
				this.addClass(this.getNextSibling(fld), 'hidden');
				if (fld.value.length == 0){

					// Failed - show the validation error
					valid = false;
					this.removeClass(this.getNextSibling(fld), 'hidden');
				}
			}

			return valid;

		},

		// Form validator method
		formValidator: function(frm, _onsuccess, _onfailed){

			if (!frm){return false;}

			// Attach to submit handler
			var $self = this;
			this.addEvent(frm, 'submit', function(e){

				try {

					// Valid submission? Call submit handler.. or allow form to submit naturally..
					if ($self.validateRequireds(frm)){
						if (_onsuccess){
							$self.cancelEvent(e);
							return _onsuccess.call(this);
						} else {
							return true;
						}

					} else {
						if (_onfailed){
							$self.cancelEvent(e);
							return _onfailed.call(this);
						} else {
							return $self.cancelEvent(e);
						}
					}

				} catch (err){
					$self.log(err);
					return $self.cancelEvent(e);
				}

			});

			return this;

		} // formValidator()

	}

})();
