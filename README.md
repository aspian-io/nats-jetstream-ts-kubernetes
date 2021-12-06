# NATS JetStream using TypeScript in Kubernetes

An implementation of some helper abstract classes in TypeScript to use NATS JetStream in Kubernetes by using official NATS client package "nats.js".

First of all, it is assumed you have Helm Kubernetes package manager installed on your computer before this. So, if helm is not installed on your system, you should first try to install it by reading its doc on helm official website using the following address:

```bash
https://helm.sh
```

After installing Helm, you should install NATS server helm charts to get it up and running in your Kubernetes cluster by using the following series of commands:

```bash
helm repo add nats https://nats-io.github.io/k8s/helm/charts/
helm install test-nats nats/nats -f helm-values/values.yaml -f helm-values/box-value.yaml
```

Next, you can expose NATS server for external access for just testing purpose by using a load balancer through the following command:

```bash
kubectl apply -f k8s/nats-lb.yaml
```

Next, you can create a local persistent volume and persistent volume claim on your development environment by using yaml Kubernetes config file that is attached to this repositories in k8s directory through the following commands:

```bash
kubectl apply -f k8s/pv-volume.yaml
kubectl apply -f k8s/pv-claim.yaml
```

Next, you should run the following command to install required npm packages in the root path of the project:

```bash
npm install
```

Finally, you can run the publisher by using:

```bash
npm run publish
```

And, listener using:

```bash
npm run listen
```

For testing NATS and JetStream working with TypeScript in Kubernetes cluster.
