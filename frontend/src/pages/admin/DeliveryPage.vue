<template>
    <div class="container">
        <div class="text-h5 text-weight-bold q-mb-md">
            Transaction List
        </div>
        <q-markup-table 
            separator="vertical" 
            bordered
        >
            <thead>
                <tr>
                <th class="text-left">Transaction #</th>
                <th class="text-right">Date</th>
                <th class="text-right">Total</th>
                <th class="text-right">Tendered</th>
                <th class="text-right">Change</th>
                <th class="text-right">Method</th>
                <th class="text-right">Status</th>
                <th class="text-right">Sold to</th>
                <th class="text-right">Action</th>
                </tr>
            </thead>
            <tbody>
                <tr 
                    v-for="transaction in transaction_list" 
                    :key="transaction.transaction_id"
                >
                    <td class="text-left">  
                        {{ transaction.transaction_id }}
                    </td>
                    <td class="text-right"> 
                        {{ transaction.transaction_timestamp }}
                    </td>
                    <td class="text-right"> 
                        {{ transaction.transaction_total }}
                    </td>
                    <td class="text-right"> 
                        {{ transaction.transaction_tendered }}
                        <q-popup-edit 
                            v-model="transaction.transaction_tendered" 
                            title="Update Tendered"
                            button
                            @save="updateTendered($event, transaction.transaction_id)"
                        >
                            <q-input 
                                v-model="transaction.transaction_tendered" 
                                dense 
                                autofocus 
                            />
                        </q-popup-edit>
                    </td>
                    <td class="text-right"> 
                        {{ transaction.transaction_change }}
                    </td>
                    <td class="text-right"> 
                        {{ transaction.transaction_method }}
                    </td>          
                    <td class="text-right">            
                        <q-select 
                            dense 
                            dark
                            transaction.transaction_change   
                            square
                            outlined 
                            v-model="transaction.transaction_status" 
                            :options="options" 
                            color="white"
                            :bg-color="transaction.transaction_status == 'Delivered'? 'primary' : 
                                        transaction.transaction_status == 'Shipped' ? 'blue-9' : 
                                        transaction.transaction_status == 'Processing' ? 'grey-5' : ''"
                            @input="updateStatus(transaction.transaction_id, transaction.transaction_status)"
                        />
                    </td>
                    <td class="text-right">
                        {{ transaction.user_fullname }}
                    </td>
                    <td class="text-right">
                        <q-btn 
                            round 
                            icon="visibility" 
                            color="primary" 
                            size="sm"  
                            @click="viewTransaction(transaction.transaction_id)" 
                        >
                            <q-tooltip anchor="top middle" self="top middle">
                                View Transaction
                            </q-tooltip>
                        </q-btn>
                    </td>
                </tr>
            </tbody>
        </q-markup-table>
    </div>
</template>

<script>

export default {
    data () {
        return {
            transaction_list: [],
            status: 'Processing',
            options: [
                'Processing', 'Shipped', 'Delivered'
            ]
        }
    },
    methods: {
        product_list() {
            this.axios.get('http://localhost:5000/transactions/transactions')
            .then(res => {
                this.transaction_list = res.data.transaction
            })
        },
        updateTendered (value, id) {
            this.axios.post('http://localhost:5000/transactions/transaction_tendered', {
                transaction_id: id,
                transaction_tendered: value
            })
            .then(res => {
                var color = ""
                var icon = ""
                if (res.data.status == "Tendered successfully updated") {
                    color = "primary"
                    icon = "check_circle"
                } else {
                    color = "warning"
                    icon = "warning"
                }
                this.$q.notify({
                    message: res.data.status,
                    icon: icon,
                    color: color,
                    position: 'bottom',
                })
                this.product_list()
            })
        },
        viewTransaction(transaction_id) {
            this.$router.push('/admin/view_transaction/' + transaction_id)
        },
        updateStatus(id, status) {
            this.axios.post('http://localhost:5000/transactions/transaction_status', {
                transaction_id: id,
                transaction_status: status
            })
            .then(res => {
                this.$q.notify({
                    message: res.data.status,
                    icon: 'check_circle',
                    color: 'accent',
                    position: 'top',
                })
            })
        }
    },
    mounted() {
        this.product_list()
    },
}
</script>