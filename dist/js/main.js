function customDropdownCloseAll(){$("*.customdropdown").attr("aria-expanded","false"),$("*.customdropdown-panel").not(".closed").addClass("closed"),window.removeEventListener("click",customDropdownCloseAll)}$("#hamburger-menu").click(function(e){$this=$("#"+this.id),$("#main-nav-wrapper").hasClass("rclosed")?($this.attr("aria-expanded","true"),$("#site-search-wrapper").removeClass("rclosed"),$("#user-nav").removeClass("rclosed"),$("#main-nav-wrapper").removeClass("rclosed")):($this.attr("aria-expanded","false"),$("#site-search-wrapper").addClass("rclosed"),$("#user-nav").addClass("rclosed"),$("#main-nav-wrapper").addClass("rclosed"))}),$(".customdropdown").click(function(e){$this=$("#"+this.id),e.preventDefault(),window.removeEventListener("click",customDropdownCloseAll),customDropdownCloseAll(),"false"==$this.attr("aria-expanded")&&($this=$("#"+this.id),$this.attr("aria-expanded","true"),$("*[aria-labelledby="+this.id).removeClass("closed"),setTimeout(function(){window.addEventListener("click",customDropdownCloseAll)},1))}),$(function(){$(".tabs").tabs()});var productImageControls=$("#product-image-focus").fotorama().data("fotorama");$(".product-image-main nav img").each(function(a){$(this).on("click",function(e){productImageControls.show(a)})});
//# sourceMappingURL=../../maps/main.js.map