export function ctrlKeyPressed() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      onCtrlDown: '&',
      onCtrlUp: '&',
    },
    link: function (scope, element, attrs) {
      angular.element(window).bind('keydown', (event) => {
        if (event.keyCode === 17) {
          scope.onCtrlDown({
            $event: {
              value: true,
            }
          });
        }
      });

      angular.element(window).bind('keyup', (event) => {
        scope.onCtrlUp({
          $event: {
            value: false,
          }
        });
      });
    }
  }
}
