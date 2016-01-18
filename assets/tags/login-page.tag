<login-page>
  <form method="post" action="/user" onsubmit="{login}" class="pure-form pure-form-stacked">
    <fieldset>
      <legend>Create an Account</legend>
      <input name="username" placeholder="username"/>
      <input name="password" placeholder="password"/>
      <input type="submit" class="pure-button pure-button-primary"/>
    </fieldset>
  </form>

  <form method="post" action="/user/authenticate" onsubmit="{join}" class="pure-form pure-form-stacked">
    <fieldset>
      <legend>or Login</legend>
      <input name="username" placeholder="username"/>
      <input name="password" placeholder="password"/>
      <input type="submit" class="pure-button pure-button-primary"/>
    </fieldset>
  </form>

  <script>
    // var self = this;
    // self.login = function(){
      
    // }
    // self.join = function(){

    // }
  </script>
</login-page>
