#posts
cd ./posts

docker build -t wagnerdenoni/blog-posts-ms .
docker push wagnerdenoni/blog-posts-ms

cd ..

#comments
cd ./comments

docker build -t wagnerdenoni/blog-comments-ms .
docker push wagnerdenoni/blog-comments-ms

cd ..

#query
cd ./query

docker build -t wagnerdenoni/blog-query-ms .
docker push wagnerdenoni/blog-query-ms

cd ..

#moderation
cd ./moderation

docker build -t wagnerdenoni/blog-moderation-ms .
docker push wagnerdenoni/blog-moderation-ms

cd ..

#event-bus
cd ./event-bus

docker build -t wagnerdenoni/blog-eventbus-ms .
docker push wagnerdenoni/blog-eventbus-ms

cd ../infra/k8s

kubectl apply -f .

cd ../..