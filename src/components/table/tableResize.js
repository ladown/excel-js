import { $ } from '../../core/dom';

export function resizeHandler($root, event) {
  const $resizer = $(event.target);
  const $parent = $resizer.closest('[data-type="resizable"]');

  const coords = $parent.getCoords();
  const type = $resizer.data.resize;

  let widthValue;
  let heightValue;

  const sideProp = type === 'col' ? 'bottom' : 'right';

  $resizer.css({
    opacity: 1,
    [sideProp]: '-5000px',
  });

  document.onmousemove = (e) => {
    if (type === 'col') {
      const delta = Math.floor(e.pageX - coords.right);
      widthValue = `${coords.width + delta}px`;

      $resizer.css({
        right: `${-delta}px`,
      });
    } else {
      const delta = Math.floor(e.pageY - coords.bottom);
      heightValue = `${coords.height + delta}px`;

      $resizer.css({
        bottom: `${-delta}px`,
      });
    }
  };

  document.onmouseup = (e) => {
    document.onmousemove = null;
    document.onmouseup = null;

    if (type === 'col') {
      $parent.css({
        width: widthValue,
      });
      $root
        .findAll(`[data-col="${$parent.data.col}"]`)
        .forEach((el) => (el.style.width = widthValue));
    } else {
      $parent.css({
        height: heightValue,
      });
    }

    $resizer.css({
      opacity: 0,
      bottom: 0,
      right: 0,
    });
  };
}
