(function (blink) {
	'use strict';

	var santillanaptStyle = function () {
			blink.theme.styles.basic.apply(this, arguments);
		},
		page = blink.currentPage;

	santillanaptStyle.prototype = {
		//BK-15873 añadimos el estilo basic como parent para la herencia de los estilos del CKEditor
		parent: blink.theme.styles.basic.prototype,
		bodyClassName: 'content_type_clase_santillanapt',
		ckEditorStyles: {
			name: 'santillanapt',
			styles: [

				{ name: 'Título 1', element: 'h4', attributes: { 'class': 'bck-title bck-title1'} },
				{ name: 'Título 2', element: 'h4', attributes: { 'class': 'bck-title bck-title2'} },

				{ name: 'Lista ordenada 1', element: 'ol', attributes: { 'class': 'bck-ol bck-ol1' } },
				{ name: 'Lista ordenada 2', element: 'ol', attributes: { 'class': 'bck-ol bck-ol2' } },
				{ name: 'Lista ordenada 3', element: 'ol', attributes: { 'class': 'bck-ol bck-ol3' } },
				{ name: 'Lista ordenada 4', element: 'ol', attributes: { 'class': 'bck-ol bck-ol4' } },

				{ name: 'Caja 1', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box1' } },
				{ name: 'Caja 2', type: 'widget', widget: 'blink_box', attributes: { 'class': 'bck-box bck-box2' } },

				{ name: 'Énfasis 1', element: 'span', attributes: { 'class': 'bck-enfasis-1'} },
				{ name: 'Énfasis 2', element: 'span', attributes: { 'class': 'bck-enfasis-2'} },

				{ name: 'Tabla verde', element: 'table', attributes: { 'class': 'bck-table bck-table-1' } },
				{ name: 'Tabla azul', element: 'table', attributes: { 'class': 'bck-table bck-table-2' } },
				{ name: 'Tabla amarilla', element: 'table', attributes: { 'class': 'bck-table bck-table-3' } },

				{ name: 'Celda verde 1', element: 'td', attributes: { 'class': 'bck-td-1' } },
				{ name: 'Celda verde 2', element: 'td', attributes: { 'class': 'bck-td-2' } },
				{ name: 'Celda azul 1', element: 'td', attributes: { 'class': 'bck-td-3' } },
				{ name: 'Celda azul 2', element: 'td', attributes: { 'class': 'bck-td-4' } },
				{ name: 'Celda amarilla 1', element: 'td', attributes: { 'class': 'bck-td-5' } },
				{ name: 'Celda amarilla 2', element: 'td', attributes: { 'class': 'bck-td-6' } }
			]
		},

		init: function (scope) {
			var that = scope || this;
			//BK-15873 Utilizamos this.parent declarada al inicio de la clase
			this.parent.init.call(that);
			that.addActivityTitle();
			if(window.esWeb) return;
			that.removeFinalSlide();
			that.handleScrollEnd();
			that.setTooltip();
			window.editar && that.configEditor();

			if ($('.navbar-bottom').length > 0) {
 				$('.navbar-bottom ol').wrapAll('<div id="bottom-navigator"></div>');
		 		var width = 0;
		 		$('.navbar-bottom li').each(function(i, elem){ width += $(elem).outerWidth(true); });
		 		$('.navbar-bottom ol').css('width', width * 1.1);
		 		var scroll = new IScroll('#bottom-navigator', {
		 			scrollX: true,
		 			scrollY: false,
		 			eventPassthrough: true
		 		});
		 		scroll.on('scrollEnd', that.handleScrollEnd);
		 		that.handleScrollEnd.call(scroll);
	 		}

		},

		configEditor: function (editor) {
			editor.dtd.$removeEmpty['span'] = false;
		},


		addActivityTitle: function () {
			if (!blink.courseInfo || !blink.courseInfo.unit) return;
			$('.libro-left').find('.title').html(function () {
				return $(this).html().trim() + ' > ' + blink.courseInfo.unit;
			});
		},

		handleScrollEnd: function () {
 			$('#bottom-navigator')
 				.removeClass('show_left')
 				.removeClass('show_right');

 			if (this.x < 0) {
 				$('#bottom-navigator').addClass('show_left');
 			}
 			if (this.x > this.maxScrollX) {
 				$('#bottom-navigator').addClass('show_right');
 			}

 		},

		setTooltip: function () {},

		//BK-15873 Quitamos la funcion getEditorStyles para que la herede de basic
	};

	santillanaptStyle.prototype = _.extend({}, new blink.theme.styles.basic(), santillanaptStyle.prototype);

	blink.theme.styles.santillanapt = santillanaptStyle;

})( blink );
