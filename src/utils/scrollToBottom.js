/**
    scrollToBottom({
        container: window,
        target: '#j_demo',
        triggerDistance: 0,
        callBack: function(){
            // 滚动到底部了
        },
        time: 300
    });

 */
export default function scrollToBottom(config) {
  let container = config.container || window;
  const _$ = window.$ || window.jQuery;
  let target = config.target;
  let triggerDistance = config.triggerDistance || 0;
  const callBack = config.callBack || _$.noop;
  const time = config.time || 300;
  container = _$(container);
  target = _$(target);
  triggerDistance = triggerDistance || 0;

  // var containerNode = container[0];
  let timer;
  const uuid = '_f35d0b75_5a21_0781_405a_b189f1f946c3';

  function onScrollToBottom() {
    /* var scrollHeight;
    if (containerNode == window) {
        scrollHeight = $(document).height();
    } else {
        scrollHeight = containerNode.scrollHeight;
    } */
    const scrollTop = container.scrollTop();
    if (scrollTop <= 0) return; // 判断当前是否有滚动

    const scrollPosition = container.height() + scrollTop;
    const bottomPosition = target.height() + target.offset().top;
    if (scrollPosition - bottomPosition + triggerDistance > 0) {
      // 到达底部
      if (_$.isFunction(callBack)) {
        callBack();
      }
    }
  }

  const stop = () => {
    container.off(`scroll.${uuid}`);
  };

  const start = () => {
    stop();
    container.on(`scroll.${uuid}`, () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        onScrollToBottom();
      }, time);
    });
  };

  return {
    stop,
    start,
  };
}
