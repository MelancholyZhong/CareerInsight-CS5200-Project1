-- Query #1 applications that Twimbo have received (Join of 3 or more tables)
SELECT c.company_name, count(*)
FROM Application AS a JOIN Position AS p USING(position_id) JOIN Company AS c USING(company_id)
WHERE c.company_name == 'Twimbo';

-- Query #2 positions from top 5 hiring companies(subquery)
SELECT title
FROM Position
WHERE company_id IN
	(SELECT company_id FROM
		(SELECT c.company_id, count(*) AS positions
		FROM Company AS c JOIN Position AS p USING(company_id)
		GROUP BY c.company_id
		ORDER BY positions DESC
		LIMIT 5
		)
	);

-- Query #3 job category that have above average base_salary (have group by and having)
SELECT c.category_name, avg(p.base_salary) as average
FROM Category AS c JOIN Position AS p USING(category_id)
GROUP BY c.category_name
HAVING average > (SELECT avg(base_salary) FROM Position);

-- Query #4 Most laid off Companies in Jan 2023 and Feb 2023(complex search criterion)
SELECT c.company_name, count(*) as layoff_count
FROM JobUpdate AS ju JOIN Position AS p ON ju.current_position == p.position_id JOIN Company AS c USING(company_id)
WHERE ju.date BETWEEN '1/1/2023' AND '2/28/2023' AND ju.update_type == 'Layoff'
GROUP BY c.company_name
ORDER BY layoff_count DESC
LIMIT 5;

-- Query #5 High pay jobs (advanced CASE)
DROP VIEW IF EXISTS average_pay;
CREATE VIEW average_pay AS
SELECT avg(base_salary + bonus + RSU) AS pay
FROM Position;

SELECT title, (base_salary + bonus + RSU) AS pay, 
	CASE
		WHEN base_salary + bonus + RSU  > (SELECT pay FROM average_pay)*1.4  THEN 'High Pay'
		ELSE 'NOT High'
	END AS high_pay
FROM Position
WHERE high_pay == 'High Pay';



