<login-page>
  <form method="post" action="/user" onsubmit="{join}" class="pure-form pure-form-stacked">
    <fieldset>
      <legend>Create an Account</legend>
      <input id="join-username" name="username" placeholder="username"/>
      <input id="join-password" name="password" placeholder="password"/>
      <input type="submit" class="pure-button pure-button-primary"/>
    </fieldset>
  </form>

  <form method="post" action="/user/authenticate" onsubmit="{login}" class="pure-form pure-form-stacked">
    <fieldset>
      <legend>or Login</legend>
      <input id="login-username" name="username" placeholder="username"/>
      <input id="login-password" name="password" placeholder="password"/>
      <input type="submit" class="pure-button pure-button-primary"/>
    </fieldset>
  </form>

  <script>
    var self = this;
    self.join = function(e){
      var state = {
        username: document.getElementById('join-username').value,
        password: document.getElementById('join-password').value
      }
      opts.userService.attemptJoin(state).then(function (response){
        opts.page.replace('/entries');
      }, function (err){
        alert(err);
      });
    }
    self.login = function(e){
      var state = {
        username: document.getElementById('login-username').value,
        password: document.getElementById('login-password').value
      }
      opts.userService.attemptLogin(state).then(function (response){
        opts.page.replace('/entries');
      }, function (err){
        alert(err);
      });
    }
  </script>
</login-page>
