Sticky Micky Table
==================

This is a forked and trimmed down version of [RWD Table Patterns](http://gergeo.se/RWD-Table-Patterns/) for making a `table` sticky upon scroll. 

Dependencies: jQuery


How to use:
--------

#### Install using Bower
```shell
bower install sticky-micky-table
```

#### Add CSS file to the ```<head>```
```html
<link rel="stylesheet" href="css/sticky-micky-table.min.css">
```

#### Add JavaScript file either to the ```<head>```, or to the bottom of ```<body>```
```html
<script type="text/javascript" src="js/sticky-micky-table.min.js"></script>
```

##### You also need to add the dependencies
- jQuery (>=1.11.0)

#### Markup
- Add the class ```.sticky-micky-table``` to the container of the table.
```html
<div class="sticky-micky-table">
   <table id="example-table">
      ...
   </table>
</div>
```

#### Initialize via JavaScript
```html
<script>
   $(function() {
      $('.sticky-micky-table').stickyMickyTable({options});
   });
</script>
```

#### Dynamic content? Call Update()!

There is an update method which you can call when the content in tbody/tfoot has changed. *The method will in turn call the private method setupBodyRows() which sets up rows that has not been setup, as well as update the sticky table header (to accommodate for any changes in columns widths).*

**You can call the method like this:**

```js
$('.sticky-micky-table').stickyMickyTable('update');
```
