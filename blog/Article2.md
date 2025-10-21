# Thinking about redundancy to save operating costs
<span style="color: grey;">Published: 2025-10-20</span>

<details>
<summary>Description</summary>
Discussing Hybrid Cloud as a solution to Cloud Outages and a way to keep costs under control.
</details>

Today's AWS Outage is yet another reminder of how important Redundancy is for even relatively non-critical services. When
thousands of people depend on your services for enterprise use cases, an outage is not something you can afford. Yet, we
will continue to see issues in mission-critical systems, often due to human error. There is no way that a system designer
can iron out all redundancy issues in code, handle once in a decade or once in a hundred-year events because of the novel
vectors by which these systems fail. As a result, any admin who has any need for uptime, should consider adopting a hybrid
cloud model in the vein of Electricity providers.

Consider your usage load in 2 parts:
a) The baseline load
b) The variance in your load
For the vast majority of cloud customers, an onsite cloud solution can handle the baseline in a more cost-effective way
than a 100% remote cloud solution. This also gives you the flexibility of allowing service continuity, even in cases where
a cloud solution may go offline, enabling a queue to manage demand through an outage whilst keeping your product online.
In the case of an onsite outage, or even regularly scheduled maintenance, cloud infrastructure can scale up to handle your
baseline load for a short period of time, saving overall costs and improving product reliability.

There are some readers who are thinking "What about Hybrid Cloud?". Hybrid cloud is an effective measure, but it again has
some complexity to it. In order to save costs, you want your overall cloud footprint to handle variance in your product load,
so multi-cloud solutions don't lend themselves very well to low-variance workloads (in fact a single remote cloud may
also be excessive). Even when you have a multi-cloud system, you want to ensure that any component in your mix can fail
without taking your products offline, even if it slows down access to your product. For example, with a full multi-cloud,
you want to be able to scale 100% of your load to either cloud. You want to consider how your product responds in a single
provider outage, and multi-provider outages with a focus on availability.

The final step in your resilience solution is to build smart automatic systems. Sometimes, things fail in such an unexpected
way that things do really go wrong. You want to ensure that any self-healing or rebalancing that happens doesn't exacerbate
the situation. Therefore, trying to rebalance a few times is productive, but repeat failures should cause the system to stop
attempting to fix the problem, and alert real people to look at, understand, and then fix the issue without constantly straining 
infrastructure during the entire recovery process.