Docker/k8s Commands

#List all images
Docker images

#Build an image
docker build -t [tag_name ie: wagnerdenoni/posts:1.0.0] .

#List all running deployments
kubectl get deployments

#Print out details about a specific deployment
Kubectl describe deployment [deployment name]

#Create/update a deployment - Can use this command to update a deployment when create a new version of a service with a specific version[tag]
Kubectl apply -f [config file name]

#Delete a deployment
Kubectl delete deployment [deployment name]

#Print out logs from a specific pod
Kubectl logs [pod name]

#Restart pods when using the latest version of an image - Used to make it easy to update an deployment
kubectl rollout restart deployment [deployment name]

#List Services
kubectl get services

#Expose service
kubectl expose deployment hello-world --type=NodePort --name=example-service

minikube start --vm=true

Kubernetes Services

Cluster IP - Sets up an easy-to-remember URL to access a pod. Only exposes pods in the cluster.
Node Port - Makes a pod accessible from outside the cluster. Usually only used for dev purposes.
Load Balancer - Makes a pod accessible from outside the cluster. This is the right way to expose a pod to the outside world.
External Name - Redirects an in-cluster request to a CNAME URL

We will just use Cluster IP and Load Balancer