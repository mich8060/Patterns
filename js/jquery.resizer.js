$(function () {
	var frame = $('<iframe width="320" height="480"></iframe>');

        $('.iphone-5-iframe').append(frame);
        var contentWindow = frame[0].contentWindow || frame[0].contentDocument;

        var setUA = function() {
            if (Object.defineProperty) {
                Object.defineProperty(contentWindow.navigator, 'userAgent', {
                    configurable: true,
                    get: function () {
                        return 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5';
                    }
                });
            } else if (Object.prototype.__defineGetter__) {
                contentWindow.navigator.__defineGetter__('userAgent', function () {
                    return 'Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_3_2 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8H7 Safari/6533.18.5';
                });
            } else {
                alert('browser not supported');
            }
        };

        setUA();
		frame.attr("src","http://www.backcountry.com");
    });

$(document).ready(function(){

});