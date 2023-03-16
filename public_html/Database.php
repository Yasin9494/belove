<?php



	class DB
	{
		// Объект класса PDO
		private $db;

		// Соединение с БД
		public function __construct()
		{
			$dbinfo = require 'db.php';

			$this->db = new PDO('mysql:host=' . $dbinfo['host'] . ';dbname=' . $dbinfo['dbname'] . ";charset=utf8", $dbinfo['login'], $dbinfo['password']);
		}

		// Операции над БД
		public function query($sql, $params = [])
		{
            
			// Подготовка запроса
			$stmt = $this->db->prepare($sql);
			
			// echo '<pre>';
			// print_r($stmt);
			// echo '</pre>';
			// Обход массива с параметрами 
			// и подставляем значения
			if ( !empty($params) ) {
				foreach ($params as $key => $value) {
					$stmt->bindValue(":$key", $value);
				}
			}
			
			// Выполняя запрос
			$stmt->execute();
			// Возвращаем ответ
			return $stmt->fetchAll(PDO::FETCH_ASSOC);
		}

		public function getAll($table, $sql = '', $params = [])
		{
			return $this->query("SELECT * FROM $table" . $sql, $params);
		}

		public function getRow($table, $sql = '', $params = [])
		{
			$result = $this->query("SELECT * FROM $table" . $sql, $params);
			return $result[0]; 
		}

	}

?>