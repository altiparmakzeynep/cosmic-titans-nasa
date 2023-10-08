using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.AI;

public class NewCrature : MonoBehaviour
{
    public Transform player; // Oyuncu karakteri
    private NavMeshAgent agent;
    private Animator animator;
    public bool isAttacking = false;

    public float attackRange = 2.0f;
    public float chaseRange = 10.0f;

    private void Start()
    {
        agent = GetComponent<NavMeshAgent>();
        animator = GetComponent<Animator>();
    }

    private void Update()
    {
        // Oyuncuya bak
        // Player ve AIAgent nesnelerinin Y pozisyonlarýný ayný yapýn
        Vector3 playerPosition = player.position;
        playerPosition.y = transform.position.y;
        transform.LookAt(playerPosition);

        float distanceToPlayer = Vector3.Distance(transform.position, player.position);

        // Oyuncu hedef mesafenin içindeyse ve saldýrý durumunda deðilse
        if (distanceToPlayer <= attackRange && !isAttacking)
        {
            // Saldýrý animasyonunu baþlat ve hedefe doðru ilerle
            //animator.SetBool("isAttack", true);
            agent.SetDestination(player.position);
            isAttacking = true;
            if (isAttacking)
            {
                animator.SetBool("isAttack", false);
                isAttacking = false;

            }
        }
        // Eðer oyuncu hedef mesafeden uzaklaþýyorsa
        else if (distanceToPlayer > attackRange && distanceToPlayer <= chaseRange)
        {
            // AI karakteri oyuncuyu takip et
            animator.SetBool("isAttack", false);
            agent.SetDestination(player.position);
            isAttacking = false;
        }
        // Eðer oyuncu hedef mesafeden daha fazla uzaklaþýrsa
        else if (distanceToPlayer > chaseRange)
        {
            // AI karakteri takibi býrak ve beklemeye geç
            animator.SetBool("isAttack", false);
            agent.ResetPath();
            isAttacking = false;
        }
    }
}
