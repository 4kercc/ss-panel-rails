function insertSuccess(btn,msg){
  $(".error").remove();
  if ($(".success").length==0){
    content = '<p class="success"><i class="fa fa-check"></i>'+msg+'</p>';
    $(content).insertBefore(btn);
  }else{
    html_content = '<i class="fa fa-check"></i>'+msg;
    $(".success").html(html_content);
  }
  $(".success").fadeOut(5000,function() { $(this).remove(); });
}

function insertError(btn,msg){
  $(".success").remove();
  if ($(".error").length==0){
    content = '<p class="error"><i class="fa fa-close"></i>'+msg+'</p>';
    $(content).insertBefore(btn);
  }else{
    html_content = '<i class="fa fa-close"></i>'+msg;
    $(".error").html(html_content);
  }
}

function changePassword(){
  $(".error").remove();
  original_password = $("#original_password").val();
  password = $("#password").val();
  if ($("#password_comfirm").val()==password){
    $.post("/user/password", {"original":original_password, "password":password},function(data){
      if (data["code"]==1){
        insertSuccess('#change-pass',data["msg"]);
      }
      else {
        insertError('#change-pass',data["msg"]);
      }
    })
  } else {
    insertError('#change-pass',"两次密码不一致");
  }
}

function changeConnectPassword(){
  $(".error").remove();
  password = $("#connect_password").val();
  $.post("/user/connectPassword", {"password":password},function(data){
    if (data["code"]==1){
      insertSuccess("#change-connect",data["msg"]);
    }
    else {
      insertError("#change-connect",data["msg"]);
    }
  })
}

function submitChat(){
  content = $("#btn-input").val();
  $("#btn-input").val('');
  if (content.length!=0){
    $.post("/user/comments",{"content": content},function(data){
      $("#btn-input").val('');
    }) 
  }
}
