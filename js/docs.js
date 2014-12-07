$(function() {

  // Email
  $("#auto-complete-email").completer({
    separator: "@",
    source: ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "live.com", "aol.com", "mail.com"]
  });

  // Time
  $("#auto-complete-time").completer({
    filter: function(val) {
      val = val.replace(/\D/g, "").substr(0, 2);

      if (val) {
        val = parseInt(val, 10) || 0;
        val = val > 23 ? 23 : val < 10 ? "0" + val : val;
      }

      return val;
    },
    separator: ":",
    source: ["00", "05", "10", "15", "20", "25", "30", "35", "40", "45", "50", "55"]
  });

  // Doamin
  var $autoCompleteDomain = $("#auto-complete-domain"),
      $autoCompleteGo = $("#auto-complete-go");

  $autoCompleteDomain.completer({
    complete: function() {
      var url = "http://www." + $autoCompleteDomain.val();

      $autoCompleteGo.attr("href", url);
    },
    separator: ".",
    source: ["com", "net", "org", "co", "io", "me", "cn", "com.cn"]
  });

  // Website
  var $autoSuggestWebsite = $("#auto-suggest-website"),
      $autoSuggestGo = $("#auto-suggest-go");

  $autoSuggestWebsite.completer({
    complete: function() {
      var url = "http://" + $autoSuggestWebsite.val();

      $autoSuggestGo.attr("href", url);
    },
    source: [
      "facebook.com",
      "plus.google.com",
      "linkedin.com",
      "flickr.com",
      "youtube.com",
      "klout.com",
      "reddit.com",
      "digg.com",
      "tumblr.com",
      "twitter.com",
      "stumbleupon.com",
      "pinterest.com"
    ],
    suggest: true
  });
});
