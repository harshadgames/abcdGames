// Assuming you already have a data layer object
window.dataLayer = window.dataLayer || [];

// Find the existing view_item event in the data layer
var existingViewItemEvent = window.dataLayer.find(function (item) {
  return item.event === "view_item";
});

// Check if the view_item event exists
if (existingViewItemEvent) {
  // Add the new parameter to the existing item array
  console.log(existingViewItemEvent);
} else {
  console.log("custom tag");
  // If the view_item event doesn't exist, push a new one with the additional parameter
}

<script>
  window.dataLayer = window.dataLayer || []; console.log(existingViewItemEvent);
</script>;
