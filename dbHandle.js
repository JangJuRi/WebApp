var db = null;
var var_no = null;
var position = null;
var index;
 
// 데이터베이스 생성 및 오픈
function openDB(){
   db = window.openDatabase('bookDB', '1.0', '북DB', 1024*1024); 
   console.log('1_DB 생성...'); 
} 
// 테이블 생성 트랜잭션 실행
function createTable() {
   db.transaction(function(tr){
   var createSQL = 'create table if not exists book(type text, name text)';       
   tr.executeSql(createSQL, [], function(){
     		console.log('2_1_테이블생성_sql 실행 성공...');        
	   }, function(){
	      console.log('2_1_테이블생성_sql 실행 실패...');            
	   });
	   }, function(){
	      console.log('2_2_테이블 생성 트랜잭션 실패...롤백은 자동');
	   }, function(){
	      console.log('2_2_테이블 생성 트랜잭션 성공...');
     });
 } 
 // 데이터 입력 트랜잭션 실행
 function insertBook(){ 
    db.transaction(function(tr){
  		var type = $('#callName1').val();
  		var name = $('#bookName1').val();
  		var insertSQL = 'insert into book(type, name) values(?, ?)';      
     	tr.executeSql(insertSQL, [type, name], function(tr, rs){    
      	    console.log('3_ 연락처 등록...no: ' + rs.insertId);
	        alert('연락처 ' + $('#callName1').val() + ' 이 입력되었습니다');      	       
	   		$('#bookName1').val('');
			$('#callName1').val('');
		}, function(tr, err){
				alert('DB오류 ' + err.message + err.code);
			}
		);
    });      
 }
// 전체 데이터 검색 트랜잭션 실행
function listBook(){
  db.transaction(function(tr){
 	var selectSQL = 'select * from book';    
  	tr.executeSql(selectSQL, [], function(tr, rs){    
       console.log(' 연락처 조회... ' + rs.rows.length + '건.');
       if (position == 'first') {
       	  if(index == 0) 
       	  	alert('더 이상의 연락처가 없습니다');   
          else       	
          	index = 0;
	   	 }
       else if (position == 'prev') {
       	  if(index == 0) 
       	  	alert('더 이상의 연락처가 없습니다');   
          else
          	index = --index;
	 		 }
       else if (position == 'next') {
       	  if(index == rs.rows.length-1) 
       	  	alert('더 이상의 연락처가 없습니다');          	
		      else
		      	index = ++index;
       }
       else 
       {  
       	  if(index == rs.rows.length-1) 
       	  	alert('더 이상의 연락처가 없습니다');          	
		      else       	
	       	  index = rs.rows.length-1;
       }
       $('#callName4').val(rs.rows.item(index).type);
       $('#bookName4').val(rs.rows.item(index).name);
 		});   
  });           
}
// 데이터 수정 트랜잭션 실행
function updateBook(){
    db.transaction(function(tr){
    	var type = $('#callName2').val();
    	var new_name = $('#bookName2').val();
    	var old_name = $('#sCallName2').val();
		var updateSQL = 'update book set type = ?, name = ? where type = ?';          
     	tr.executeSql(updateSQL, [type, new_name, old_name], function(tr, rs){    
	         console.log('5_연락처 수정.... ') ;
	         alert('연락처 ' + $('#sCallName2').val() + ' 이 수정되었습니다');   	         
	   		 $('#bookName2').val(''); $('#sCallName2').val('');   
	   		 $('#callName2').val(''); $('#sCallName2').val(''); 
		}, function(tr, err){
				alert('DB오류 ' + err.message + err.code);
			}
		);
    });       
}
// 데이터 삭제 트랜잭션 실행
function deleteBook(){
   db.transaction(function(tr){
	  var name = $('#sCallName3').val();   
 	  var deleteSQL = 'delete from book where type = ?';      
	  tr.executeSql(deleteSQL, [name], function(tr, rs){    
	     console.log('6_연락처 삭제... ');   
	     alert('연락처 ' + $('#callName3').val() + ' 이 삭제되었습니다');   	     
	   	 $('#bookName3').val(''); $('#callName3').val(''); $('#sCallName3').val('');   	     
		}, function(tr, err){
				alert('DB오류 ' + err.message + err.code);
			}
		);
   });         
} 
// 데이터 수정 위한 데이터 검색 트랜잭션 실행
function selectBook2(name){
   db.transaction(function(tr){
	 var selectSQL = 'select type, name from book where type=?';        
  	 tr.executeSql(selectSQL, [name], function(tr, rs){
  	 	 $('#callName2').val(rs.rows.item(0).type);
       $('#bookName2').val(rs.rows.item(0).name);
	 	});
   });         
}
// 데이터 삭제 위한 데이터 검색 트랜잭션 실행
function selectBook3(name){
   db.transaction(function(tr){
 	 var selectSQL = 'select type, name from book where type=?';      
		tr.executeSql(selectSQL, [name], function(tr, rs){ 
			 $('#callName3').val(rs.rows.item(0).type);
       $('#bookName3').val(rs.rows.item(0).name);
		}, function(tr, err){
				alert('DB오류 ' + err.message + err.code);
			}
		);
	});         
}
// 데이터 조건 검색 트랜잭션 실행
function selectBook4(name){
   db.transaction(function(tr){
 	 var selectSQL = 'select type, name from book where type=?';      
  	 tr.executeSql(selectSQL, [name], function(tr, rs){ 
         $('#callName4').val(rs.rows.item(0).type);
         $('#bookName4').val(rs.rows.item(0).name);
		}, function(tr, err){
				alert('DB오류 ' + err.message + err.code);
			}
		);
   });         
 };
