using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Fila
{
    public partial class Form1 : Form
    {
        const int tm = 5;
        string[] fila = new string[tm];
        int p = 0;
        int u = -1;
        int qtd = 0;

        public Form1()
        {
            InitializeComponent();
        }

        private void Adicionar(string pNome)
        {
            if (qtd == tm)
            {
                MessageBox.Show("Fila cheia");
                return;
            }
            u++;

            fila[u] = pNome;
            qtd++;

        }

        private string Retirar()
        {
            string retorno = "";

            if (qtd == 0)
            {
                MessageBox.Show("Fila vazia");
                return "";
            }

            retorno = fila[p];
            fila[p] = "";
            p++;
            qtd--;
            return retorno;

           
        }

        private void MostrarFila()
        {
            lbxFila.Items.Clear();

            for (int i = 0; i < tm; i++)
            {
                if (fila[i] != null)
                    lbxFila.Items.Add(fila[i]);
            }

        }

        private void btnAdicionar_Click(object sender, EventArgs e)
        {
            Adicionar(txtAdicionar.Text);
            txtAdicionar.Clear();
            txtAdicionar.Focus();
            MostrarFila();
        }

        private void btnRetirar_Click(object sender, EventArgs e)
        {
            txtRetirado.Text = Retirar();
            MostrarFila();
        }

        private void btnEstado_Click(object sender, EventArgs e)
        {
            txtPrimeiro.Text = p.ToString();
            txtUltimo.Text = u.ToString();
            txtTamanho.Text = qtd.ToString();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            string[] fila = new string[tm];
            p = 0;
            u = -1;
            qtd = 0;
            lbxFila.Items.Clear();
        }
    }
}
