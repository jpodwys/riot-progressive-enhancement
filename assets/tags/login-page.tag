<login-page>
  <form method="post" action="/user/authenticate" onsubmit="{login}" class="pure-form-stacked">
    <input name="username" placeholder="username"/>
    <input name="password" placeholder="password"/>
    <input type="submit" class="pure-button pure-button-primary"/>
  </form>

  <form method="post" action="/user" onsubmit="{join}" class="pure-form-stacked">
    <input name="username" placeholder="username"/>
    <input name="password" placeholder="password"/>
    <input type="submit" class="pure-button pure-button-primary"/>
  </form>

  <script>
    // var self = this;
    // self.login = function(){
      
    // }
    // self.join = function(){

    // }
  </script>
</login-page>
