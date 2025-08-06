from pyspark.sql import SparkSession
from contextlib import redirect_stdout


spark = SparkSession.builder \
    .appName("Sales Revenue Forecasting") \
    .master("local[*]") \
    .config("spark.driver.memory", "8g") \
    .getOrCreate()


df_meta = spark.read.json("path_to/meta_Clothing_Shoes_and_Jewelry.json")
df_review = spark.read.json("path_to/Clothing_Shoes_and_Jewelry.json")


revenue_df = joined_df \
    .filter(col("price").isNotNull()) \
    .groupBy("asin", "date") \
    .agg(
        _sum("price").alias("daily_revenue"),
        count("*").alias("num_reviews")
    )

df_review = df_review.withColumn("date", to_date(from_unixtime(col("timestamp") / 1000)))


cols_needed = ["asin", "price", "average_rating", "title", "categories", "store"]
df_meta_filtered = df_meta.select([c for c in cols_needed if c in df_meta.columns])


cols_needed = ["asin", "price", "average_rating", "title", "categories", "store"]
df_meta_filtered = df_meta.select([c for c in cols_needed if c in df_meta.columns])

revenue_df = joined_df.filter(col("price").isNotNull()) \
    .withColumn("date", to_date("date")) \
    .groupBy("asin", "date") \
    .agg(
        _sum("price").alias("daily_revenue"),
        count("*").alias("num_reviews")
    )



asin_metrics = revenue_df.groupBy("parent_asin") \
    .agg(
        count("*").alias("num_days"),
        _sum("daily_revenue").alias("total_revenue")
    ) \
    .filter(col("num_days") > 30) \
    .orderBy(col("total_revenue").desc())

top_asins = asin_metrics.limit(5).select("parent_asin").rdd.flatMap(lambda x: x).collect()



for asin_id in top_asins:
    df_product = revenue_df.filter(col("parent_asin") == asin_id).orderBy("date")
    df_pd = df_product.select("date", "daily_revenue").toPandas()
    df_pd.to_csv(f"{asin_id}_sales_history.csv", index=False)


df_sentiment = df_reviews \
    .groupBy("asin", "date") \
    .agg(avg("sentiment_score").alias("daily_sentiment"))



df_sentiment = df_reviews \
    .groupBy("asin", "date") \
    .agg(avg("sentiment_score").alias("daily_sentiment"))


revenue_df = joined_df.filter(col("price").isNotNull()) \
    .withColumn("date", to_date("date")) \
    .groupBy("asin", "date") \
    .agg(
        _sum("price").alias("daily_revenue"),
        count("*").alias("num_reviews")
    )


asin_metrics = revenue_df.groupBy("parent_asin") \
    .agg(
        count("*").alias("num_days"),
        _sum("daily_revenue").alias("total_revenue"),
        avg("daily_revenue").alias("avg_daily_revenue")
    ) \
    .filter(col("num_days") > 30) \
    .orderBy(col("total_revenue").desc())

top_asins = asin_metrics.limit(5).select("parent_asin").rdd.flatMap(lambda x: x).collect()


for asin_id in top_asins:
    target_df = revenue_df.filter(col("parent_asin") == asin_id).orderBy("date")
    df_pd = target_df.select("date", "daily_revenue").toPandas()
    file_path = os.path.join(output_dir, f"{asin_id}_sales_history.csv")
    df_pd.to_csv(file_path, index=False)


model = nn.Sequential(
    nn.LSTM(input_size=1, hidden_size=64, num_layers=2, batch_first=True),
    nn.Linear(64, 1)
)
