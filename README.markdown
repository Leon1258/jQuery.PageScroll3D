Page Scroll 3D
--------------

##### Example

Just add a link to the css file in your `<head>`:

```html
<!-- Add the jquery.pageScroll3d.min.css -->
<link rel="stylesheet" href="styles/jquery.pageScroll3d.min.css">
```

Then add:

```html
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js"></script>
<script defer src="js/jquery.mousewheel.min.js"></script>
<script defer src="js/jquery.pageScroll3d.min.js"></script>
```

Make sure that the jquery library and the mousewell plugin are added, otherwise the plugin will not work!

You still need to call $(element).scroll3D(); to initialize plugin on the element.


```html
<main class="main-content">
	<section>
		<h1>Spring</h1>
	</section>
	<section>
		<h1>Summer</h1>
	</section>
	<section>
		<h1>Autumn</h1>
	</section>
	<section>
		<h1>Winter</h1>
	</section>
</main>

<script>
	$(document).ready(function() {
		$('.main-content').scroll3D();
	});
</script>
```

Information from the h1 tag automatically becomes the button name in the menu.

Copyright (c) 2017 Leon.
